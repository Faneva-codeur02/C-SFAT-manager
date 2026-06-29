import { useAuth } from "@/context/AuthContext";
import { useProfile } from "./useProfile";
import { ROLE_PERMISSIONS } from "@/auth/can";
import type { Permission } from "@/auth/permissions";

export function usePermission() {
    const { user } = useAuth();
    const profile = useProfile(user?.id);

    function can(permission: Permission): boolean {
        if (!profile) return false;

        return ROLE_PERMISSIONS[profile.role].includes(permission);
    }

    return { can };
}