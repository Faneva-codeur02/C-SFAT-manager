import { useEffect, useState } from "react";

import { getContributionRateSummary } from "../services/reports.service";
import type { ContributionRateSummary } from "../types/report.types";

const EMPTY: ContributionRateSummary = {

    totalDue: 0,

    totalPaid: 0,

    memberCountUpToDate: 0,

    memberCountLate: 0,

};

export function useContributionRateSummary() {

    const [summary, setSummary] =
        useState<ContributionRateSummary>(EMPTY);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadSummary();

    }, []);

    async function loadSummary() {

        try {
            setLoading(true);

            const result = await getContributionRateSummary();

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