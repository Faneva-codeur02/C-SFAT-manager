import { supabase } from "@/shared/lib/supabase";
import {
    Users,
    Wallet,
    Clock3,
    UserPlus,
} from "lucide-react";

import type {
    DashboardStat,
} from "../types/dashboard.types";

export async function getDashboardStats() {

    const today = new Date().toISOString().slice(0, 10);

    // Nombre total de membres
    const {
        count: totalMembers,
        error: membersError,
    } = await supabase
        .from("profiles")
        .select("*", {
            count: "exact",
            head: true,
        });

    if (membersError) throw membersError;

    // Invitations actives
    const {
        count: activeInvitations,
        error: invitationError,
    } = await supabase
        .from("invitation_codes")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq("used", false);

    if (invitationError) throw invitationError;

    // Toutes les cotisations (pour le calcul des recettes, peu importe la date)
    const {
        data: allContributions,
        error: contributionError,
    } = await supabase
        .from("member_contributions")
        .select(`
            amount_paid,
            status
        `);

    if (contributionError) throw contributionError;

    // Cotisations en retard : uniquement celles déjà arrivées à échéance
    const {
        data: dueContributions,
        error: dueError,
    } = await supabase
        .from("member_contributions")
        .select(
            `profile_id,
        status,
        contribution_period:contribution_periods!inner(period_start)`
        )
        .not("status", "in", "(paid,cancelled)")
        .lte("contribution_period.period_start", today);

    if (dueError) throw dueError;

    let revenue = 0;

    allContributions?.forEach(contribution => {

        if (contribution.status === "paid" || contribution.status === "partial") {

            revenue += Number(contribution.amount_paid ?? 0);

        }

    });

    const lateProfileIds = new Set(

        (dueContributions ?? []).map((row: any) => row.profile_id),

    );

    const lateCount = lateProfileIds.size;

    const cards: DashboardStat[] = [

        {
            title: "Membres",

            value: totalMembers ?? 0,

            description: "Membres inscrits",

            icon: Users,

            color: "blue",

            trend: 12,
        },

        {
            title: "Cotisations",

            value: revenue,

            suffix: " Ar",

            description: "Recettes",

            icon: Wallet,

            color: "green",

            trend: 8,
        },

        {
            title: "En retard",

            value: lateCount,

            description: "Membre en retard",

            icon: Clock3,

            color: "orange",

            trend: -3,
        },

        {
            title: "Invitations",

            value: activeInvitations ?? 0,

            description: "Codes actifs",

            icon: UserPlus,

            color: "purple",

        },

    ];

    return cards;

}