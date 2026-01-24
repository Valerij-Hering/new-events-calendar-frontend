import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './app/styles/index.scss'
import "./shared/config/i18n";
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/contexts/AuthContext.jsx';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store.js';
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
          <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
