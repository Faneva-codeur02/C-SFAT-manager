import { useEffect, useState } from "react";

import { dashboardMock } from "../data/dashboard.mock";

import type { DashboardData } from "../types/dashboard.types";

export function useDashboard() {

    const [data, setData] =
        useState<DashboardData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    async function refresh() {

        try {

            setLoading(true);

            setError(null);

            // Plus tard :
            // const data = await dashboardService();

            await new Promise(resolve =>
                setTimeout(resolve, 700)
            );

            setData(dashboardMock);

        } catch {

            setError(
                "Impossible de charger le tableau de bord."
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        refresh();

    }, []);

    return {

        data,

        loading,

        error,

        refresh,

    };

}