import { PERMISSIONS } from "@/auth/permissions";
import type { Permission } from "@/auth/permissions";

export const ROUTE_PERMISSIONS: Record<
    string,
    Permission | undefined
> = {

    dashboard: undefined,

    members: PERMISSIONS.MEMBERS_VIEW,

    archivedMembers: PERMISSIONS.MEMBERS_VIEW,

    registrations: PERMISSIONS.MEMBERS_CREATE,

    invitations: PERMISSIONS.INVITATIONS_CREATE,

    contributions: PERMISSIONS.CONTRIBUTIONS_VIEW,

    accounting: PERMISSIONS.ACCOUNTING_VIEW,

    events: PERMISSIONS.EVENTS_VIEW,

    reports: PERMISSIONS.ACCOUNTING_VIEW,

    settings: PERMISSIONS.SETTINGS_MANAGE,

};