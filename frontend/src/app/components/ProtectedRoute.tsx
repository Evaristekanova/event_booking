"use client";

import React, { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./shared/Loader";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    } else if (requireAdmin && !isAdmin) {
      router.push("/dashboard");
    }
  }, [
    isAuthenticated,
    isAdmin,
    loading,
    requireAuth,
    requireAdmin,
    redirectTo,
    router,
  ]);

  if (loading) {
    return <Loader />;
  }

  if ((requireAuth && !isAuthenticated) || (requireAdmin && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
};
