import { useEffect, useState } from "react";

import { getSeasonAccountingSummary } from "../services/accounting.service";
import type { SeasonAccountingSummary } from "../services/accounting.service";

const EMPTY: SeasonAccountingSummary = {

    totalIncome: 0,

    totalExpense: 0,

};

export function useSeasonAccountingSummary(seasonId?: string) {

    const [summary, setSummary] =
        useState<SeasonAccountingSummary>(EMPTY);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!seasonId) {

            setLoading(false);

            return;

        }

        loadSummary();

    }, [seasonId]);

    async function loadSummary() {

        if (!seasonId) return;

        try {
            setLoading(true);

            const result = await getSeasonAccountingSummary(seasonId);

            setSummary(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        summary,

        loading,

        reloadSummary: loadSummary,

    };

}