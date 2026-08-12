import type { ContributionStatus } from "./contribution.types";

export type ContributionSort =
    | "name"
    | "dueDate"
    | "amount";

export interface ContributionFilters {

    search?: string;

    status?: ContributionStatus;

    seasonId?: string;

    contributionPeriodId?: string;

    sortBy: ContributionSort;

    order: "asc" | "desc";

}

export interface ContributionPagination {

    page: number;

    pageSize: number;

}