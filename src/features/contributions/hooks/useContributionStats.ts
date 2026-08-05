import { useEffect, useState } from "react";

import { contributionRepository }
    from "../repositories/contribution.repository";

import type {
    ContributionStats,
} from "../types/contribution-stats.types";

export function useContributionStats() {

    const [stats, setStats] =
        useState<ContributionStats | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function load() {

            try {

                const result =
                    await contributionRepository.getStats();

                setStats(result);

            } finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    return {

        stats,

        loading,

    };

}