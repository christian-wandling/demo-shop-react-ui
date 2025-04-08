import { Navigate, Outlet } from 'react-router';
import { hasPermission, PermissionStrategy } from '@demo-shop-react-ui/auth';

export const ProtectedRoute = () => {
  const isAuthenticated = hasPermission(PermissionStrategy.AUTHENTICATED);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
