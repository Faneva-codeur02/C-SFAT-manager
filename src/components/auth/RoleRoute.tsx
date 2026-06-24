import { Navigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

type RoleRouteProps = {
    children: React.ReactNode;
    allowedRoles: string[];
};

export default function RoleRoute({
    children,
    allowedRoles,
}: RoleRouteProps) {
    const { user } = useAuth();
    const profile = useProfile(user?.id);

    if (!profile) {
        return <div>Chargement...</div>;
    }

    if (!allowedRoles.includes(profile.role)) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}