// import { useAuth } from "@/context/auth-context";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const { user } = useAuth();
  const secured = true;

  return secured ? <>{children}</> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
