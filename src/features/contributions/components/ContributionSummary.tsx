import {
    Wallet,
    CircleCheckBig,
    Clock3,
    Coins,
} from "lucide-react";

import DashboardStats from "@/features/dashboard/components/DashboardStats";

import type {
    DashboardStat,
} from "@/features/dashboard/types/dashboard.types";

interface Props {

    total: number;

    paid: number;

    pending: number;

    revenue: number;

}

export default function ContributionSummary({

    total,

    paid,

    pending,

    revenue,

}: Props) {

    const stats: DashboardStat[] = [

        {

            title: "Cotisations",

            value: total,

            description: "Toutes périodes",

            color: "blue",

            icon: Wallet,

        },

        {

            title: "Payées",

            value: paid,

            description: "Cotisations réglées",

            color: "green",

            icon: CircleCheckBig,

        },

        {

            title: "En attente",

            value: pending,

            description: "À payer",

            color: "orange",

            icon: Clock3,

        },

        {

            title: "Recettes",

            value: revenue,

            description: "Ariary",

            color: "purple",

            icon: Coins,

        },

    ];

    return <DashboardStats stats={stats} />;

}