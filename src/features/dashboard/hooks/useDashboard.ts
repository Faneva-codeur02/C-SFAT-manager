import { useEffect, useState } from "react";

import type { DashboardData } from "../types/dashboard.types";
import { getDashboardData } from "../services/dashboard.service";

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
            const dashboard = await getDashboardData();



            await new Promise(resolve =>
                setTimeout(resolve, 700)
            );

            // setData(dashboard);

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