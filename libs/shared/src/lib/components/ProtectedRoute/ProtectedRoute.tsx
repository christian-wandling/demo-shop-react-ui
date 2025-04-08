import { Navigate, Outlet } from 'react-router';
import { hasPermission, PermissionStrategy } from '@demo-shop-react-ui/auth';

/**
 * Component that protects routes requiring authentication
 */
export const ProtectedRoute = () => {
  const isAuthenticated = hasPermission(PermissionStrategy.AUTHENTICATED);

  // If not authenticated, redirect to home page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
