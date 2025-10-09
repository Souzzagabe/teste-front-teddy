import { createBrowserRouter } from "react-router-dom";
import LoginWrapper from "../components/wrappers/LoginWrapper";
import ProtectedRoute from "../components/wrappers/ProtectedRouteWrapper";
import { SuspenseWrapper } from "../components/wrappers/SuspenseWrapper";
import ErrorBoundary from "./ErrorBoundary";
import { lazy } from "react";

const ListingWrapper = lazy(() => import("remote_listing/Listing"));
const HeaderWrapper = lazy(() => import("remote_header/Header"));

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
        <SuspenseWrapper>
          <ListingWrapper />
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/header",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <HeaderWrapper />
        </SuspenseWrapper>
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
