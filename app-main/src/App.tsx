import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
