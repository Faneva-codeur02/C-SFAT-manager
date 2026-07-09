import type {
    MemberStatus,
    VoicePart,
} from "@/types";

export type MemberSort =
    | "name"
    | "firstname"
    | "voicePart"
    | "registrationDate";

export interface MemberFilters {

    search?: string;

    status?: MemberStatus;

    voicePart?: VoicePart;

    sortBy?: MemberSort;

    order?: "asc" | "desc";

    page: number;

    pageSize: number;

}