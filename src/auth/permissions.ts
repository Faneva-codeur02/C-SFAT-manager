export const PERMISSIONS = {

    DASHBOARD_VIEW: "dashboard.view",

    MEMBERS_VIEW: "members.view",
    MEMBERS_CREATE: "members.create",
    MEMBERS_EDIT: "members.edit",
    MEMBERS_ARCHIVE: "members.archive",
    MEMBERS_DELETE: "members.delete",
    MEMBERS_RESTORE: "members.restore",

    REGISTRATIONS_VIEW: "registrations.view",

    INVITATIONS_VIEW: "invitations.view",
    INVITATIONS_CREATE: "invitations.create",

    CONTRIBUTIONS_VIEW: "contributions.view",
    CONTRIBUTIONS_CREATE: "contributions.create",
    CONTRIBUTIONS_EDIT: "contributions.edit",

    ACCOUNTING_VIEW: "accounting.view",
    ACCOUNTING_CREATE: "accounting.create",
    ACCOUNTING_EDIT: "accounting.edit",

    EVENTS_VIEW: "events.view",
    EVENTS_CREATE: "events.create",

    SETTINGS_MANAGE: "settings.manage",

} as const;


export type Permission =
    (typeof PERMISSIONS)[keyof typeof PERMISSIONS];