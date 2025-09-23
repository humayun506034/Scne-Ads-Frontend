import Loading from "@/common/MapLoading";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}) => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      navigate(redirectTo);
    }
  }, [user, navigate, allowedRoles, redirectTo]);

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
