import { useState } from "react";

import { useSearch } from "@/shared/context/SearchContext";

import type { AccountingSort } from "../types/accounting-filter";

export function useAccountingFilters() {

    const { search } = useSearch();

    const [entryType, setEntryType] =
        useState<"income" | "expense">();

    const [categoryId, setCategoryId] =
        useState<string>();

    const [financialAccountId, setFinancialAccountId] =
        useState<string>();

    const [seasonId, setSeasonId] =
        useState<string>();

    const [sortBy] =
        useState<AccountingSort>("date");

    const [order] =
        useState<"asc" | "desc">("desc");

    return {

        search,

        entryType,

        categoryId,

        financialAccountId,

        seasonId,

        sortBy,

        order,

        setEntryType,

        setCategoryId,

        setFinancialAccountId,

        setSeasonId,

    };

}