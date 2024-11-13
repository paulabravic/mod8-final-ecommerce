import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import CollaresProvider from "./context/CollaresProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/collares-bruno">
      <CollaresProvider>
        <App />
      </CollaresProvider>
    </BrowserRouter>
  </React.StrictMode>
);
