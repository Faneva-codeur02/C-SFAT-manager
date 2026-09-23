import { useEffect, useState } from "react";

import { getTononkiraList } from "../services/tononkira.service";
import type { Tononkira } from "../types/tononkira.types";
import type { TononkiraFilters, TononkiraPagination } from "../types/tononkira-filter";

export function useTononkiraList(
    filters: TononkiraFilters,
    pagination: TononkiraPagination,
) {

    const [songs, setSongs] = useState<Tononkira[]>([]);

    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSongs();

    }, [
        filters.search,
        pagination.page,
        pagination.pageSize,
    ]);

    async function loadSongs() {

        try {
            setLoading(true);

            const result = await getTononkiraList(filters, pagination);

            setSongs(result.songs);

            setTotal(result.total);

        } finally {

            setLoading(false);

        }

    }

    return {

        songs,

        total,

        loading,

        loadSongs,

    };

}