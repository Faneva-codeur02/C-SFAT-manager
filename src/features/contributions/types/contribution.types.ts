import type {
    Profile,
} from "@/types";

export type ContributionStatus =
    | "pending"
    | "partial"
    | "paid"
    | "late";

export type PaymentMethod =
    | "cash"
    | "mobile_money"
    | "bank_transfer";

export interface Season {

    id: string;

    name: string;

    start_date: string;

    end_date: string;

    is_current: boolean;

}

export interface ContributionPeriod {

    id: string;

    season_id: string;

    week_number: number;

    period_start: string;

    period_end: string;

    due_date: string;

    amount: number;

}

export interface MemberContribution {

    id: string;

    profile_id: string;

    contribution_period_id: string;

    amount_due: number;

    amount_paid: number;

    status: ContributionStatus;

    paid_at: string | null;

    note: string | null;

    created_at: string;

    updated_at: string;

}

// Vue "enrichie" pour l'affichage (jointure profile + period)
export interface MemberContributionWithDetails extends MemberContribution {

    profile: Pick<Profile, "id" | "nom" | "prenom" | "member_number">;

    contribution_period: ContributionPeriod;

}

export interface Payment {

    id: string;

    profile_id: string;

    amount: number;

    payment_method: PaymentMethod;

    payment_date: string;

    reference: string | null;

    note: string | null;

    received_by: string | null;

    financial_account_id: string | null;

    created_at: string;

    updated_at: string;

}

export interface PaymentAllocation {

    id: string;

    payment_id: string;

    member_contribution_id: string;

    allocated_amount: number;

    created_at: string;

}

// Payload pour créer un paiement + répartir sur une ou plusieurs cotisations
export interface CreatePaymentPayload {

    profile_id: string;

    amount: number;

    payment_method: PaymentMethod;

    payment_date: string;

    reference?: string;

    note?: string;

    financial_account_id?: string;

    // les cotisations à couvrir avec ce paiement
    allocations: Array<{
        member_contribution_id: string;
        allocated_amount: number;
    }>;

}

export interface ContributionFilters {

    search?: string;

    status?: ContributionStatus;

    seasonId?: string;

    contributionPeriodId?: string;

    sortBy?: "name" | "dueDate" | "amount";

    order?: "asc" | "desc";

}

export interface ContributionPagination {

    page: number;

    pageSize: number;

}