import StatCard from "@/shared/components/stats/StatCard";

import { useInvitationStats }
    from "../hooks/useInvitationStats";

export default function InvitationStats() {

    const stats =
        useInvitationStats();

    if (stats.loading) {

        return null;

    }

    return (

        <div
            className="
                grid
                gap-4
                md:grid-cols-2
                lg:grid-cols-4
                mb-6
            "
        >

            <StatCard

                title="Total"

                value={stats.total}

            />

            <StatCard

                title="Valides"

                value={stats.valid}

                color="text-green-600"

            />

            <StatCard

                title="Utilisés"

                value={stats.used}

                color="text-blue-600"

            />

            <StatCard

                title="Expirés"

                value={stats.expired}

                color="text-red-600"

            />

        </div>

    );

}