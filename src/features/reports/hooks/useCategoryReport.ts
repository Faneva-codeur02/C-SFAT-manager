import { useEffect, useState } from "react";

import { getCategoryReport } from "../services/reports.service";
import type { CategoryReportRow } from "../types/report.types";

export function useCategoryReport(seasonId?: string) {

    const [rows, setRows] =
        useState<CategoryReportRow[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!seasonId) {

            setLoading(false);

            return;

        }

        loadReport();

    }, [seasonId]);

    async function loadReport() {

        if (!seasonId) return;

        try {
            setLoading(true);

            const result = await getCategoryReport(seasonId);

            setRows(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        rows,

        loading,

    };

}