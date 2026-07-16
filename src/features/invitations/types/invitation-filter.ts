export type InvitationStatus =
    | "all"
    | "valid"
    | "used"
    | "expired";

export type InvitationSort =
    | "code"
    | "createdAt"
    | "expiresAt";

export interface InvitationFilters {

    search: string;

    status: InvitationStatus;

    sortBy: InvitationSort;

    order: "asc" | "desc";

}