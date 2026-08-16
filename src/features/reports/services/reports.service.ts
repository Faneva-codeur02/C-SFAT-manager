import { supabase } from "@/shared/lib/supabase";

import type { CategoryReportRow, ContributionRateSummary, MemberArrearsRow } from "../types/report.types";

export async function getCategoryReport(
    seasonId: string,
): Promise<CategoryReportRow[]> {

    const { data, error } = await supabase
        .from("accounting_entries")
        .select(
            `amount,
            category:account_categories(id, name, type)`
        )
        .eq("season_id", seasonId);

    if (error) {
        throw error;
    }

    const byCategory = new Map<string, CategoryReportRow>();

    for (const row of (data ?? []) as any[]) {

        const cat = row.category;

        if (!byCategory.has(cat.id)) {

            byCategory.set(cat.id, {

                categoryId: cat.id,

                categoryName: cat.name,

                categoryType: cat.type,

                total: 0,

            });

        }

        byCategory.get(cat.id)!.total += row.amount;

    }

    return Array.from(byCategory.values()).sort((a, b) => {

        if (a.categoryType !== b.categoryType) {

            return a.categoryType === "income" ? -1 : 1;

        }

        return b.total - a.total;

    });

}

export async function getContributionRateSummary(): Promise<ContributionRateSummary> {

    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
        .from("member_contributions")
        .select(
            `profile_id,
            amount_due,
            amount_paid,
            status,
            contribution_period:contribution_periods!inner(period_start)`
        )
        .lte("contribution_period.period_start", today);

    if (error) {
        throw error;
    }

    const rows = (data ?? []) as any[];

    let totalDue = 0;

    let totalPaid = 0;

    const lateProfiles = new Set<string>();

    const allProfiles = new Set<string>();

    for (const row of rows) {

        totalDue += row.amount_due;

        totalPaid += row.amount_paid;

        allProfiles.add(row.profile_id);

        if (row.status !== "paid" && row.status !== "cancelled") {

            lateProfiles.add(row.profile_id);

        }

    }

    return {

        totalDue,

        totalPaid,

        memberCountLate: lateProfiles.size,

        memberCountUpToDate: allProfiles.size - lateProfiles.size,

    };

}

export async function getMembersInArrears(): Promise<MemberArrearsRow[]> {

    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
        .from("member_contributions")
        .select(
            `amount_due,
            amount_paid,
            profile:profiles(id, nom, prenom, member_number),
            contribution_period:contribution_periods!inner(period_start)`
        )
        .not("status", "in", "(paid,cancelled)")
        .lte("contribution_period.period_start", today);

    if (error) {
        throw error;
    }

    const byProfile = new Map<string, MemberArrearsRow>();

    for (const row of (data ?? []) as any[]) {

        const p = row.profile;

        if (!byProfile.has(p.id)) {

            byProfile.set(p.id, {

                profileId: p.id,

                nom: p.nom,

                prenom: p.prenom,

                memberNumber: p.member_number,

                monthsOwed: 0,

                totalOwed: 0,

            });

        }

        const entry = byProfile.get(p.id)!;

        entry.monthsOwed += 1;

        entry.totalOwed += row.amount_due - row.amount_paid;

    }

    return Array.from(byProfile.values()).sort((a, b) => b.totalOwed - a.totalOwed);

}