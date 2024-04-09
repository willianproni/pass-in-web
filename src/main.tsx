import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./routes/home";
import { AteendeeScreen } from "./routes/attendee.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/ateendee",
        element: <AteendeeScreen />,
      },
      {
        path: "/ateendee/:id",
        element: <AteendeeScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
