import { endpoints } from '../../../shared/api/endpoints';
import { createApiConfig } from '../../../shared/api/createApiConfig';
import { api } from '../../../shared/api/api'
import { getDeviceId } from "../lib/deviceID";


const config = {
  production: 'https://new-events-calendar-backend.onrender.com',
  develop: 'http://localhost:8000'
}
export const apiUrl = config.production;


export const userApi = api.injectEndpoints({

  endpoints: (builder) => ({
    registration: builder.mutation({
  query: (userData) => ({
    method: "POST",
    url: endpoints.path.registration,
    body: {
      ...userData,
      deviceId: getDeviceId(),
    },
  }),
}),

login: builder.mutation({
  query: (credentials) => ({
    method: "POST",
    url: endpoints.path.login,
    body: {
      ...credentials,
      deviceId: getDeviceId(),
    },
  }),
}),

    updateUser: builder.mutation({
      query: (body) => createApiConfig({
        method: "PUT",
        url: endpoints.path.updateUser, // например: /api/user
        body,
      }),
      invalidatesTags: ["User"], // чтобы обновился getUser
    }),

    logout: builder.mutation({
      queryFn: () => ({ data: null }),
    }),

    getUser: builder.query({
      queryFn: async () => {
        try {
          const res = await axiosInstance.get(endpoints.path.user);
          return { data: res.data };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["User"],
    }),

    resetPassword: builder.mutation({
      query: (body) => createApiConfig({
        method: "POST", 
        url: endpoints.path.reset_password, 
        body: body
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => createApiConfig({
        method: "PUT", 
        url: endpoints.path.change_password, 
        body: body
      }),
    }),

    resendActivationEmail: builder.mutation({
      query: () =>
        createApiConfig({
          method: 'POST',
          url: endpoints.path.resend_activation, 
        }),
    }),

  }),
});

export const { 
  useRegistrationMutation, 
  useLoginMutation, 
  useLogoutMutation,
  useUpdateUserMutation,
  useGetUserQuery, 
  useResetPasswordMutation, 
  useChangePasswordMutation,
  useResendActivationEmailMutation,
} = userApi;
