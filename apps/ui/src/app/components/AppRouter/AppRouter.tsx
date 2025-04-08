import { Navigate, useRoutes } from 'react-router';
import { productRoutes } from '@demo-shop-react-ui/product';
import { orderRoutes } from '@demo-shop-react-ui/order';
import { shoppingRoutes } from '@demo-shop-react-ui/shopping';
import { LoadingSpinner } from '@demo-shop-react-ui/shared';
import { Suspense } from 'react';

export const AppRouter = () => {
  const routes = useRoutes([
    { path: '/', element: <Navigate to="/products" replace /> },
    ...productRoutes,
    ...orderRoutes,
    ...shoppingRoutes,
    { path: '**', element: <Navigate to="/" replace /> },
  ]);

  return <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>;
};
