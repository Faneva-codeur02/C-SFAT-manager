import { supabase } from "@/shared/lib/supabase";

import type {
    ContributionPeriod,
    CreatePaymentPayload,
    MemberContributionWithDetails,
    Payment,
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

    const sortColumn = {

        name: "profile.nom",

        dueDate: "contribution_period.due_date",

        amount: "amount_due",

    }[filters.sortBy ?? "dueDate"];

    query = query.order(
        sortColumn,
        {
            ascending: filters.order !== "desc",
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
        "create_payment_with_allocations",
        {
            p_profile_id: payload.profile_id,
            p_amount: payload.amount,
            p_payment_method: payload.payment_method,
            p_payment_date: payload.payment_date,
            p_allocations: payload.allocations,
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