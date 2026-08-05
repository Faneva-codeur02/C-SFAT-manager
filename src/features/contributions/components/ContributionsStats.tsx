import {

    Wallet,

    Coins,

    TriangleAlert,

    Percent,

} from "lucide-react";

import {
    StatsGrid,
} from "@/shared/components/stats";

import { useContributionStats }
    from "../hooks/useContributionStats";

export default function ContributionsStats() {

    const {

        stats,

        loading,

    } = useContributionStats();

    if (loading || !stats) {

        return null;

    }

    return (

        <StatsGrid

            stats={[

                {

                    title: "Total attendu",

                    value: stats.totalExpected,

                    icon: Wallet,

                    color: "blue",

                    description: "Cotisations",

                },

                {

                    title: "Total payé",

                    value: stats.totalPaid,

                    icon: Coins,

                    color: "green",

                    description: "Paiements",

                },

                {

                    title: "Reste",

                    value: stats.remaining,

                    icon: TriangleAlert,

                    color: "red",

                    description: "À encaisser",

                },

                {

                    title: "Taux",

                    value: stats.paymentRate,

                    icon: Percent,

                    color: "purple",

                    description: "Paiements",

                },

            ]}

        />

    );

}