import { useEffect, useState } from "react";

import { getSeasons } from "@/shared/services/seasons.service";
import type { Season } from "@/features/contributions/types/contribution.types";

export function useSeasons() {

    const [seasons, setSeasons] =
        useState<Season[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadSeasons();

    }, []);

    async function loadSeasons() {

        try {
            setLoading(true);

            const result = await getSeasons();

            setSeasons(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        seasons,

        loading,

        reloadSeasons: loadSeasons,

    };

}