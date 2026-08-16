import { useEffect, useState } from "react";

import { getAccountCategories } from "../services/accounting.service";
import type { AccountCategory } from "../types/accounting.types";

export function useAccountCategories() {

    const [categories, setCategories] =
        useState<AccountCategory[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadCategories();

    }, []);

    async function loadCategories() {

        try {
            setLoading(true);

            const result = await getAccountCategories();

            setCategories(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        categories,

        loading,

    };

}