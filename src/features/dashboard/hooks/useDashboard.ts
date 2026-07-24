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

    useEffect(() => {

        async function loadDashboard() {

            try {

                setLoading(true);

                // Plus tard :
                // const data = await dashboardService()

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

        loadDashboard();

    }, []);

    return {

        data,

        loading,

        error,

    };

}