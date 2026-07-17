import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children, requiredRole }) {

  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && !roles.includes(requiredRole)) {
    return <Navigate to="/dashboard" replace />
  }

  return children;
}