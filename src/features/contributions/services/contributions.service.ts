import { supabase } from "@/shared/lib/supabase";

import type {
    ContributionFilters,
    ContributionPagination,
    ContributionPeriod,
    CreatePaymentPayload,
    MemberContributionWithDetails,
    Payment,
} from "../types/contribution.types";

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

    // 1. Enregistrer le paiement
    const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .insert({
            profile_id: payload.profile_id,
            amount: payload.amount,
            payment_method: payload.payment_method,
            payment_date: payload.payment_date,
            reference: payload.reference ?? null,
            note: payload.note ?? null,
            financial_account_id: payload.financial_account_id ?? null,
        })
        .select()
        .single();

    if (paymentError) {
        throw paymentError;
    }

    // 2. Répartir ce paiement sur les cotisations concernées
    const allocationRows = payload.allocations.map((allocation) => ({
        payment_id: payment.id,
        member_contribution_id: allocation.member_contribution_id,
        allocated_amount: allocation.allocated_amount,
    }));

    const { error: allocationError } = await supabase
        .from("payment_allocations")
        .insert(allocationRows);

    if (allocationError) {
        throw allocationError;
    }

    // 3. Mettre à jour chaque cotisation couverte (amount_paid + status)
    // ⚠️ Voir la remarque après ce fichier au sujet de cette étape
    for (const allocation of payload.allocations) {

        const { data: contribution, error: fetchError } = await supabase
            .from("member_contributions")
            .select("amount_due, amount_paid")
            .eq("id", allocation.member_contribution_id)
            .single();

        if (fetchError) {
            throw fetchError;
        }

        const newAmountPaid =
            contribution.amount_paid + allocation.allocated_amount;

        const newStatus =
            newAmountPaid >= contribution.amount_due
                ? "paid"
                : "partial";

        const { error: updateError } = await supabase
            .from("member_contributions")
            .update({
                amount_paid: newAmountPaid,
                status: newStatus,
                paid_at: newStatus === "paid" ? payload.payment_date : null,
            })
            .eq("id", allocation.member_contribution_id);

        if (updateError) {
            throw updateError;
        }

    }

    return payment;

}