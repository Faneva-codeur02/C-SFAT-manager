export const ROLES = {
    ADMIN: "admin",
    TREASURER: "treasurer",
    MEMBER: "member",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];