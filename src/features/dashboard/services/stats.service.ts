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

    // Toutes les cotisations
    const {
        data: contributions,
        error: contributionError,
    } = await supabase
        .from("member_contributions")
        .select(`
            amount_paid,
            status
        `);

    if (contributionError) throw contributionError;

    const stats = {

        paid: 0,

        pending: 0,

        partial: 0,

        cancelled: 0,

        revenue: 0,

    };

    contributions?.forEach(contribution => {

        switch (contribution.status) {

            case "paid":

                stats.paid++;

                stats.revenue += Number(
                    contribution.amount_paid ?? 0
                );

                break;

            case "pending":

                stats.pending++;

                break;

            case "partial":

                stats.partial++;

                stats.revenue += Number(
                    contribution.amount_paid ?? 0
                );

                break;

            case "cancelled":

                stats.cancelled++;

                break;

        }

    });

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

            value: stats.revenue,

            suffix: " Ar",

            description: "Recettes",

            icon: Wallet,

            color: "green",

            trend: 8,
        },

        {
            title: "En attente",

            value: stats.pending,

            description: "Cotisations à payer",

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