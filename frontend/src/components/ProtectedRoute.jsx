import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wrap any route's element with this. If the user isn't logged in,
// <Navigate> redirects them to /login instead of rendering children.
// We also pass the page they were trying to reach via route "state",
// so LoginPage can send them back there after they sign in.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
