export const PERMISSIONS = {
    MEMBERS_VIEW: "members.view",
    MEMBERS_CREATE: "members.create",
    MEMBERS_EDIT: "members.edit",
    MEMBERS_DELETE: "members.delete",

    CONTRIBUTIONS_VIEW: "contributions.view",
    CONTRIBUTIONS_CREATE: "contributions.create",
    CONTRIBUTIONS_EDIT: "contributions.edit",

    ACCOUNTING_VIEW: "accounting.view",
    ACCOUNTING_CREATE: "accounting.create",
    ACCOUNTING_EDIT: "accounting.edit",

    EVENTS_VIEW: "events.view",
    EVENTS_CREATE: "events.create",

    INVITATIONS_CREATE: "invitations.create",

    SETTINGS_MANAGE: "settings.manage",
} as const;

export type Permission =
    (typeof PERMISSIONS)[keyof typeof PERMISSIONS];