import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/401"  />;
  }

  return children;
};

export default ProtectedRoute;