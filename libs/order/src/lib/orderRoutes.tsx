import { lazy } from 'react';
import { ProtectedRoute } from '@demo-shop-react-ui/shared';

const OrderList = lazy(() => import('./components/OrderList/OrderList'));
const OrderDetail = lazy(() => import('./components/OrderDetail/OrderDetail'));

export const orderRoutes = [
  {
    path: '/orders',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <OrderList /> },
      { path: ':id', element: <OrderDetail /> },
    ],
  },
];
