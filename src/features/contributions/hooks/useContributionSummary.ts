import { useEffect, useState } from "react";

import { getContributionSummary } from "../services/contributions.service";
import type { ContributionSummary } from "../types/contribution.types";

const EMPTY_SUMMARY: ContributionSummary = {

    monthsOwed: 0,

    totalDue: 0,

    lastPaidPeriodStart: null,

};

export function useContributionSummary(profileId?: string) {

    const [summary, setSummary] =
        useState<ContributionSummary>(EMPTY_SUMMARY);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!profileId) {

            setLoading(false);

            return;

        }

        loadSummary();

    }, [profileId]);

    async function loadSummary() {

        if (!profileId) return;

        try {
            setLoading(true);

            const result = await getContributionSummary(profileId);

            setSummary(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        summary,

        loading,

    };

}