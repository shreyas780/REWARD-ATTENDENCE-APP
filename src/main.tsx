import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Get root element safely
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("❌ Root element not found. Check your index.html for <div id='root'></div>");
}

// Create root and render
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
