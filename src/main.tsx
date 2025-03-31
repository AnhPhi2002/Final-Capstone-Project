import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router"; // ✅ Sửa đúng thư viện
import { Toaster } from 'sonner';
import { Provider } from "react-redux";
import { store } from "./lib/api/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";


const GOOGLE_CLIENT_ID = "401058314814-18103n9hp639mera1g1574h16ouojn4s.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster closeButton position="top-right" richColors duration={3000} />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
