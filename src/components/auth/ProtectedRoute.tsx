import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { usePermission } from "@/hooks/usePermission";
import type { Permission } from "@/auth/permissions";

interface ProtectedRouteProps {
    children: ReactNode;
    permission?: Permission;
}

export default function ProtectedRoute({
    children,
    permission,
}: ProtectedRouteProps) {

    const { user, loading } = useAuth();

    const { can } = usePermission();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Chargement...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (permission && !can(permission)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}