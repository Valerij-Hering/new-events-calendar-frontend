import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEmailActivationToast } from "../model/useEmailActivationToast";
import { useResendActivationEmailMutation } from "../api/userApi";
import { store } from "../../../app/store/store";
import { eventApi } from "../../../features/createEvent/api/eventApi"

const AuthContext = createContext();
const API_URL = 'https://new-events-calendar-backend.onrender.com'; //"http://localhost:8000"
const REFRESH_INTERVAL = 10 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(Cookies.get("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const [resendActivationEmail] = useResendActivationEmailMutation();

  useEmailActivationToast({
    isAuthenticated,
    user,
    resendActivationEmail,
  });

  // 🔹 axiosInstance мемоизирован
  const axiosInstance = useMemo(() => {
    const instance = axios.create({ baseURL: API_URL });

    instance.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = Cookies.get("refreshToken");
            if (!refreshToken) throw new Error("Нет refresh токена");
            const res = await axios.post(`${API_URL}/refresh`, { refreshToken }, { withCredentials: true });
            const { accessToken: newAccessToken, user: newUser } = res.data;
            setAccessToken(newAccessToken);
            Cookies.set("token", newAccessToken, { expires: 7 });
            setUser(newUser);
            setIsAuthenticated(true);
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [accessToken]);

  // 🔹 Silent refresh
  const silentRefresh = useCallback(async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) return;

    try {
      const res = await axios.post(`${API_URL}/refresh`, { refreshToken });
      const { accessToken: newAccessToken, user: newUser } = res.data;
      setAccessToken(newAccessToken);
      Cookies.set("token", newAccessToken, { expires: 7 });
      setUser(newUser);
      setIsAuthenticated(true);
    } catch {
      logout();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(silentRefresh, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [silentRefresh]);

  // 🔹 Загрузка user при инициализации accessToken
  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) return;
      try {
        const res = await axiosInstance.get("/user");
        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, [accessToken, axiosInstance]); // axiosInstance в зависимостях

  const login = (token, refreshToken, userData) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("refreshToken", refreshToken, { expires: 7 });
    setAccessToken(token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
    store.dispatch(eventApi.util.resetApiState());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, accessToken, login, logout, axiosInstance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// 🔹 функция для RTK Query или других утилит
export const getAccessToken = () => {
  // Берём токен из state AuthContext
  try {
    const ctx = useContext(AuthContext);
    return ctx.accessToken;
  } catch {
    return null;
  }
};