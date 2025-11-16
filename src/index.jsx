import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./styles/global.css";

// Create a minimal router that mounts the existing <App /> as the root element.
// Enable React Router v7 future flags to opt-in to upcoming behaviors and
// suppress the informational warnings shown in the console during development.
const router = createBrowserRouter(
  [
    {
      // Use a splat route so the inner <App /> can handle nested routes like /dashboard
      path: "/*",
      element: <App />
    }
  ],
  {
    // Opt-in to v7 behaviors (safe for development). Remove or change as needed.
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
