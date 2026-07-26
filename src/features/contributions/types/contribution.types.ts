import type { Tables } from "@/types/database";

/**
 * Statut d'une cotisation
 */
export type ContributionStatus =
    Tables<"member_contributions">["status"];

/**
 * Une cotisation
 */
export interface Contribution {

    id: string;

    memberId: string;

    memberName: string;

    periodId: string;

    periodLabel: string;

    expectedAmount: number;

    amountPaid: number;

    remainingAmount: number;

    paidAt: string | null;

    status: ContributionStatus;

    notes?: string | null;

}

/**
 * Résumé affiché en haut de la page
 */
export interface ContributionSummary {

    totalContributions: number;

    paidContributions: number;

    pendingContributions: number;

    partialContributions: number;

    cancelledContributions: number;

    totalRevenue: number;

}

/**
 * Filtres
 */
export interface ContributionFilters {

    search: string;

    status: ContributionStatus | "all";

    memberId: string | "all";

    year: number | "all";

    month: number | "all";

}

/**
 * Pagination
 */
export interface ContributionPagination {

    page: number;

    pageSize: number;

    total: number;

}

/**
 * Données de la page
 */
export interface ContributionsData {

    summary: ContributionSummary;

    contributions: Contribution[];

    pagination: ContributionPagination;

}