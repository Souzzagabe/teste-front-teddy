import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import ErrorBoundary from './ErrorBoundary';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const RemoteHeader = lazy(() => import('remote_header/Header'));
const RemoteLogin = lazy(() => import('remote_login/Login'));
const RemoteListing = lazy(() => import('remote_listing/Listing'));

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress size={60} thickness={4} color="primary" />
  </Box>
);


const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RemoteLogin />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <RemoteListing />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/header',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <RemoteHeader />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '*',
    element: <ErrorBoundary />,
  },
]);

export default router;
