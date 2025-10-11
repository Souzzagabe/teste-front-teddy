import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Suspense } from 'react';

export default function App() {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}
