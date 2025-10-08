import React, { Suspense } from 'react';

const RemoteHeader = React.lazy(() => import('remote_header/Header'));
const RemoteLogin = React.lazy(() => import('remote_login/Login'));
const RemoteListing = React.lazy(() => import('remote_listing/Listing'));

const LoadingSpinner = () => (
  <div className="flex justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  return (
    <div className="p-4">
      <Suspense fallback={<LoadingSpinner />}>
        <RemoteHeader />
        <RemoteLogin />
        <RemoteListing />
      </Suspense>

      <h1>app main</h1>
    </div>
  );
}

export default App;
