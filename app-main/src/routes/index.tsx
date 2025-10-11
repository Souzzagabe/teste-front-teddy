import { createBrowserRouter } from "react-router-dom";
import LoginWrapper from "../components/wrappers/LoginWrapper";
import ProtectedRoute from "../components/wrappers/ProtectedRouteWrapper";
import ErrorBoundary from "./ErrorBoundary";
import { lazy } from "react";

const ListingWrapper = lazy(() => import("remote_listing/Listing"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginWrapper />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
          <ListingWrapper />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);

export default router;
