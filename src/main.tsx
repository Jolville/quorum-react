import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { Welcome } from "./pages/welcome";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Verify } from "./pages/verify.tsx";
import { Profile } from "./pages/profile.tsx";
import routes from "./routes.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: routes.welcome,
        element: <Welcome />,
      },
      {
        path: routes.verify,
        element: <Verify />,
      },
      {
        path: routes.profile,
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
