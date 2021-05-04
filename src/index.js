import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { DataProvider } from "./context/data-context";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
