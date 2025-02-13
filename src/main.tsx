import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { Toaster } from 'sonner';
import { Provider } from "react-redux";
import { store } from "./lib/api/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="833627949397-ba23vhh4j00m31kfg68ri32c8lnkodue.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster closeButton position="top-right" richColors duration={2000} />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
