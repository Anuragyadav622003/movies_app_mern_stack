import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * AdminRoute - Protects routes that require admin privileges
 * Redirects to home if user is not an admin
 */
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Show nothing while checking auth status
  if (isLoading) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
