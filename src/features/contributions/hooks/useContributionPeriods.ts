import { useEffect, useState } from "react";

import {
    getContributionPeriods,
} from "../services/contributions.service";
import type { ContributionPeriod } from "../types/contribution.types";

export function useContributionPeriods(seasonId?: string) {

    const [periods, setPeriods] =
        useState<ContributionPeriod[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadPeriods();

    }, [seasonId]);

    async function loadPeriods() {

        try {
            setLoading(true);

            const result =
                await getContributionPeriods(seasonId);

            setPeriods(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        periods,

        loading,

        loadPeriods,

    };

}