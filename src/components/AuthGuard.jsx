import { Navigate, Outlet, useLocation } from "react-router-dom";

function AuthGuard() {
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default AuthGuard;
