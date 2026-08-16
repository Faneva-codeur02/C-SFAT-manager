export type AccountingSort = "date" | "amount";

export interface AccountingFilters {

    search?: string;

    entryType?: "income" | "expense";

    categoryId?: string;

    financialAccountId?: string;

    seasonId?: string;

    sortBy: AccountingSort;

    order: "asc" | "desc";

}

export interface AccountingPagination {

    page: number;

    pageSize: number;

}