import { Navigate, Outlet } from 'react-router';
import { hasPermission, PermissionStrategy } from '@demo-shop-react-ui/auth';

/**
 * A route wrapper component that protects routes from unauthenticated access.
 *
 * This component checks if the user is authenticated before rendering child routes.
 * If the user is not authenticated, they will be redirected to the home page.
 *
 * @example
 * ```tsx
 * <Routes>
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *     <Route path="/settings" element={<Settings />} />
 *   </Route>
 * </Routes>
 * ```
 *
 * @returns The child routes via Outlet if authenticated, otherwise redirects to home page
 */
export const ProtectedRoute = (): Element => {
  const isAuthenticated = hasPermission(PermissionStrategy.AUTHENTICATED);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
