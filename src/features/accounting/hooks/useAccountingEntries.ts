import { useEffect, useState } from "react";

import { getAccountingEntries } from "../services/accounting.service";
import type { AccountingEntryWithDetails } from "../types/accounting.types";
import type { AccountingFilters, AccountingPagination } from "../types/accounting-filter";

export function useAccountingEntries(
    filters: AccountingFilters,
    pagination: AccountingPagination,
) {

    const [entries, setEntries] =
        useState<AccountingEntryWithDetails[]>([]);

    const [total, setTotal] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadEntries();

    }, [
        filters.search,
        filters.entryType,
        filters.categoryId,
        filters.financialAccountId,
        filters.seasonId,
        filters.sortBy,
        filters.order,
        pagination.page,
        pagination.pageSize,
    ]);

    async function loadEntries() {

        try {
            setLoading(true);

            const result = await getAccountingEntries(filters, pagination);

            setEntries(result.entries);

            setTotal(result.total);

        } finally {

            setLoading(false);

        }

    }

    return {

        entries,

        total,

        loading,

        loadEntries,

    };

}