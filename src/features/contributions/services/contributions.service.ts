import { supabase } from "@/shared/lib/supabase";

import type {
    ContributionPeriod,
    ContributionSummary,
    CreatePaymentPayload,
    MemberContributionWithDetails,
    MemberYearGridRow,
    Payment,
    PaymentAllocationWithPeriod,
    Season,
} from "../types/contribution.types";

import type {
    ContributionFilters,
    ContributionPagination,
} from "../types/contribution-filter";

export async function getMemberContributions(
    filters: ContributionFilters,
    pagination: ContributionPagination,
) {

    let profileIds: string[] | null = null;

    if (filters.search) {

        const search =
            filters.search.trim();

        const { data: matchingProfiles, error: searchError } =
            await supabase
                .from("profiles")
                .select("id")
                .or(
                    `nom.ilike.%${search}%,prenom.ilike.%${search}%,member_number.ilike.%${search}%`
                );

        if (searchError) {
            throw searchError;
        }

        profileIds = (matchingProfiles ?? []).map((p) => p.id);

        // Aucun membre ne correspond à la recherche : on renvoie une liste vide
        if (profileIds.length === 0) {
            return {
                contributions: [],
                total: 0,
            };
        }

    }

    let query = supabase
        .from("member_contributions")
        .select(
            `*,
            profile:profiles(id, nom, prenom, member_number),
            contribution_period:contribution_periods(*)`,
            { count: "exact" },
        );

    if (profileIds) {
        query = query.in("profile_id", profileIds);
    }

    if (filters.status) {
        query = query.eq("status", filters.status);
    }

    if (filters.contributionPeriodId) {
        query = query.eq("contribution_period_id", filters.contributionPeriodId);
    }

    if (filters.seasonId) {
        query = query.eq("contribution_period.season_id", filters.seasonId);
    }

    type SortConfig = {
        column: string;
        referencedTable?: string;
    };

    const sortConfig: Record<string, SortConfig> = {

        name: { column: "nom", referencedTable: "profile" },

        dueDate: { column: "due_date", referencedTable: "contribution_period" },

        amount: { column: "amount_due" },

    };

    const { column, referencedTable } =
        sortConfig[filters.sortBy ?? "dueDate"];

    query = query.order(
        column,
        {
            ascending: filters.order !== "desc",
            referencedTable,
        },
    );

    query = query.range(

        pagination.page * pagination.pageSize,

        pagination.page * pagination.pageSize
        + pagination.pageSize
        - 1

    );

    const {
        data,
        error,
        count,
    } = await query;

    if (error) {
        throw error;
    }

    return {

        contributions: (data ?? []) as MemberContributionWithDetails[],

        total: count ?? 0,

    };

}

export async function getContributionsByProfile(
    profileId: string,
): Promise<MemberContributionWithDetails[]> {

    const { data, error } = await supabase
        .from("member_contributions")
        .select(
            `*,
            profile:profiles(id, nom, prenom, member_number),
            contribution_period:contribution_periods(*)`
        )
        .eq("profile_id", profileId)
        .order("contribution_period(period_start)", { ascending: false });

    if (error) {
        throw error;
    }

    return (data ?? []) as MemberContributionWithDetails[];

}

export async function getContributionPeriods(
    seasonId?: string,
): Promise<ContributionPeriod[]> {

    let query = supabase
        .from("contribution_periods")
        .select("*")
        .order("week_number", { ascending: true });

    if (seasonId) {
        query = query.eq("season_id", seasonId);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return data ?? [];

}

export async function getPaymentsByProfile(
    profileId: string,
): Promise<Payment[]> {

    const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("profile_id", profileId)
        .order("payment_date", { ascending: false });

    if (error) {
        throw error;
    }

    return data ?? [];

}

export async function createPayment(
    payload: CreatePaymentPayload,
): Promise<Payment> {

    const { data, error } = await supabase.rpc(
        "record_payment_with_auto_allocation",
        {
            p_profile_id: payload.profile_id,
            p_amount: payload.amount,
            p_payment_method: payload.payment_method,
            p_payment_date: payload.payment_date,
            p_reference: payload.reference ?? undefined,
            p_note: payload.note ?? undefined,
            p_financial_account_id: payload.financial_account_id ?? undefined,
        },
    );

    if (error) {
        throw error;
    }

    return data;

}

// Nouveau : récupère le détail de répartition d'un paiement (pour le reçu)
export async function getPaymentAllocations(
    paymentId: string,
): Promise<PaymentAllocationWithPeriod[]> {

    const { data, error } = await supabase
        .from("payment_allocations")
        .select(
            `id,
            allocated_amount,
            member_contribution:member_contributions(
                contribution_period:contribution_periods(*)
            )`
        )
        .eq("payment_id", paymentId);

    if (error) {
        throw error;
    }

    return (data ?? []).map((row: any) => ({

        id: row.id,

        allocated_amount: row.allocated_amount,

        contribution_period: row.member_contribution.contribution_period,

    }));

}

// Nouveau : total dû restant pour un membre, toutes périodes impayées confondues
export async function getOutstandingBalance(
    profileId: string,
): Promise<number> {

    const { data, error } = await supabase
        .from("member_contributions")
        .select("amount_due, amount_paid")
        .eq("profile_id", profileId)
        .not("status", "in", "(paid,cancelled)");

    if (error) {
        throw error;
    }

    return (data ?? []).reduce(

        (sum, row) => sum + (row.amount_due - row.amount_paid),

        0,

    );

}

export async function getSeasons(): Promise<Season[]> {

    const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        throw error;
    }

    return data ?? [];

}

export async function getContributionsGridForSeason(
    seasonId: string,
): Promise<MemberYearGridRow[]> {

    const { data, error } = await supabase
        .from("member_contributions")
        .select(
            `amount_due,
            amount_paid,
            status,
            profile:profiles(id, nom, prenom, member_number),
            contribution_period:contribution_periods!inner(id, period_start, season_id)`
        )
        .eq("contribution_period.season_id", seasonId);

    if (error) {
        throw error;
    }

    const byProfile = new Map<string, MemberYearGridRow>();

    for (const row of (data ?? []) as any[]) {

        const profileId = row.profile.id;

        if (!byProfile.has(profileId)) {

            byProfile.set(profileId, {

                profile: row.profile,

                months: Array.from({ length: 12 }, () => null),

            });

        }

        const monthIndex =
            new Date(row.contribution_period.period_start).getMonth();

        byProfile.get(profileId)!.months[monthIndex] = {

            contributionPeriodId: row.contribution_period.id,

            periodStart: row.contribution_period.period_start,

            amountDue: row.amount_due,

            amountPaid: row.amount_paid,

            status: row.status,

        };

    }

    return Array.from(byProfile.values()).sort(

        (a, b) => a.profile.nom.localeCompare(b.profile.nom),

    );

}

export async function getContributionSummary(
    profileId: string,
): Promise<ContributionSummary> {

    const today = new Date().toISOString().slice(0, 10);

    const { data: owedRows, error: owedError } = await supabase
        .from("member_contributions")
        .select(
            `amount_due,
            amount_paid,
            contribution_period:contribution_periods!inner(period_start)`
        )
        .eq("profile_id", profileId)
        .not("status", "in", "(paid,cancelled)")
        .lte("contribution_period.period_start", today);

    if (owedError) {
        throw owedError;
    }

    const rows = (owedRows ?? []) as any[];

    const monthsOwed = rows.length;

    const totalDue = rows.reduce(

        (sum, row) => sum + (row.amount_due - row.amount_paid),

        0,

    );

    const { data: lastPaidRows, error: lastPaidError } = await supabase
        .from("contribution_periods")
        .select(
            `period_start,
        member_contributions!inner(amount_paid, profile_id)`
        )
        .eq("member_contributions.profile_id", profileId)
        .gt("member_contributions.amount_paid", 0)
        .order("period_start", { ascending: false })
        .limit(1);

    if (lastPaidError) {
        throw lastPaidError;
    }

    const lastPaidPeriodStart =
        (lastPaidRows?.[0] as any)?.period_start ?? null;

    return {

        monthsOwed,

        totalDue,

        lastPaidPeriodStart,

    };

}