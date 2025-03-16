import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Only initialize TempoDevtools in development
if (import.meta.env.DEV) {
  import("tempo-devtools")
    .then(({ TempoDevtools }) => {
      TempoDevtools.init();
    })
    .catch((err) => console.error("Failed to load TempoDevtools:", err));
}

// Use empty string as basename for production
const basename = import.meta.env.DEV ? import.meta.env.BASE_URL : "";

const root = document.getElementById("root");

if (root) {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("Error rendering app:", error);
    // Display error on page for debugging
    root.innerHTML = `<div style="padding: 20px; color: red;">
      <h2>Error Rendering Application</h2>
      <pre>${error instanceof Error ? error.message : String(error)}</pre>
    </div>`;
  }
} else {
  console.error("Root element not found");
}
