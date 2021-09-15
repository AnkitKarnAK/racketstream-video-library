import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { DataProvider } from "./context/data-context";
import { ModalProvider } from "./context/modal-context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ModalProvider>
        <DataProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </DataProvider>
      </ModalProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
