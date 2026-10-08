import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: "job_seeker" | "admin";
}

const ProtectedRoute = ({
  children,
  role,
}: ProtectedRouteProps) => {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User has the wrong role
  if (role && user.role !== role) {
    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin-dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/job-seeker-dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;