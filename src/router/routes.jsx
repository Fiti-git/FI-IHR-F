// src/router/routes.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthPage from "../features/auth/AuthPage";
import ProjectList from "../features/project/ProjectList";
import SupportList from "../features/support/SupportList";
import DashboardLayout from "../layout/DashboardLayout";

const router = createBrowserRouter([
  // public
  { path: "/login", element: <AuthPage /> },

  // protected
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // default → /projects
          { index: true, element: <Navigate to="projects" replace /> },
          { path: "projects", element: <ProjectList /> },
          { path: "support", element: <SupportList /> },
          // add more nested pages here…
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
