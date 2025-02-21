import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router"; // ✅ Sửa đúng thư viện
import { Toaster } from 'sonner';
import { Provider } from "react-redux";
import { store } from "./lib/api/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";


const GOOGLE_CLIENT_ID = "833627949397-ba23vhh4j00m31kfg68ri32c8lnkodue.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster closeButton position="top-right" richColors duration={2000} />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
