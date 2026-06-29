import type { ReactNode } from "react";
import { usePermission } from "@/hooks/usePermission";
import type { Permission } from "@/auth/permissions";

interface Props {
    permission: Permission;
    children: ReactNode;
}

export default function Can({
    permission,
    children,
}: Props) {
    const { can } = usePermission();

    if (!can(permission)) {
        return null;
    }

    return <>{children}</>;
}