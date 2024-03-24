import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { Welcome } from "./pages/welcome";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirectDocument,
} from "react-router-dom";
import { Verify } from "./pages/verify.tsx";
import { Profile } from "./pages/profile.tsx";
import routes from "./routes.ts";
import { Post } from "./pages/post.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <></>,
        loader() {
          return redirectDocument(routes.welcome);
        },
      },
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
      {
        path: routes.post.path,
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
