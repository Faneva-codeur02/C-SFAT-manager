import { useEffect, useState } from "react";

import { getContributionsGridForSeason } from "../services/contributions.service";
import type { MemberYearGridRow } from "../types/contribution.types";

export function useContributionsGrid(seasonId?: string) {

    const [rows, setRows] =
        useState<MemberYearGridRow[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!seasonId) {

            setLoading(false);

            return;

        }

        loadGrid();

    }, [seasonId]);

    async function loadGrid() {

        try {
            setLoading(true);

            const result = await getContributionsGridForSeason(seasonId!);

            setRows(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        rows,

        loading,

        reloadGrid: loadGrid,

    };

}