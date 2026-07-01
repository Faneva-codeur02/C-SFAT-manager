import { useAuth } from "@/context/AuthContext";

import { ROLE_PERMISSIONS } from "@/auth/can";
import type { Permission } from "@/auth/permissions";

export function usePermission() {

    const { profile } = useAuth();

    function can(permission: Permission): boolean {

        if (!profile) {
            return false;
        }

        return ROLE_PERMISSIONS[profile.role].includes(permission);

    }

    return { can };

}