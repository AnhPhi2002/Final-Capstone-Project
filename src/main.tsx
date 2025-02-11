// import { StrictMode } from 'react'
// import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner.tsx'
import { Provider } from "react-redux";
import {store} from "./lib/api/redux/store.ts"
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="207028405584-gnjs6j75poej50a6m0v0pthqce8u2scq.apps.googleusercontent.com">
    <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
    </Provider>

    </GoogleOAuthProvider>
)
