import { lazy } from 'react';
import { ProtectedRoute } from '@demo-shop-react-ui/shared';

const Checkout = lazy(() => import('./components/Checkout/Checkout'));

export const shoppingRoutes = [
  {
    path: '',
    element: <ProtectedRoute />,
    children: [{ path: 'checkout', element: <Checkout /> }],
  },
];
