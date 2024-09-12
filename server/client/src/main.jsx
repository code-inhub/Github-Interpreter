import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthState from "./context/auth/AuthState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthState>
  </StrictMode>
);
