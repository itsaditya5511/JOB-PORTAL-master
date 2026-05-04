import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import axios from "axios";
import { toast } from "sonner";

import store from "./redux/store";
import { setUser } from "./redux/authSlice";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

// Global 401 interceptor — clears stale session and redirects to login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute =
        error.config?.url?.includes("/login") ||
        error.config?.url?.includes("/register");
      if (!isAuthRoute) {
        store.dispatch(setUser(null));
        toast.error("Session expired. Please sign in again.", {
          description: "Your session has ended. Redirecting to login…",
          duration: 4000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
            style: { borderRadius: "12px", fontSize: "14px" },
          }}
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);
