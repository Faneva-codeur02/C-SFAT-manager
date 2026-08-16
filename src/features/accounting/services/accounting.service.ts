import { supabase } from "@/shared/lib/supabase";

import type { FinancialAccount } from "../types/accounting.types";

import type {
    AccountCategory,
    AccountingEntry,
    CreateManualEntryPayload,
} from "../types/accounting.types";

import type {
    AccountingEntryWithDetails,
} from "../types/accounting.types";
import type {
    AccountingFilters,
    AccountingPagination,
} from "../types/accounting-filter";

export async function getFinancialAccounts(): Promise<FinancialAccount[]> {

    const { data, error } = await supabase
        .from("financial_accounts")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true });

    if (error) {
        throw error;
    }

    return data ?? [];

}

export async function getAccountCategories(): Promise<AccountCategory[]> {

    const { data, error } = await supabase
        .from("account_categories")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        throw error;
    }

    return data ?? [];

}

async function getCurrentSeasonId(): Promise<string> {

    const { data, error } = await supabase
        .from("seasons")
        .select("id")
        .eq("is_current", true)
        .limit(1)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error("Aucune saison active trouvée");
    }

    return data.id;

}

export async function createAccountingEntry(
    payload: CreateManualEntryPayload,
): Promise<AccountingEntry> {

    const seasonId = await getCurrentSeasonId();

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("accounting_entries")
        .insert({
            season_id: seasonId,
            category_id: payload.category_id,
            financial_account_id: payload.financial_account_id,
            amount: payload.amount,
            entry_type: payload.entry_type,
            entry_date: payload.entry_date,
            description: payload.description ?? null,
            created_by: user?.id ?? null,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function getAccountingEntries(
    filters: AccountingFilters,
    pagination: AccountingPagination,
) {

    let query = supabase
        .from("accounting_entries")
        .select(
            `*,
            category:account_categories(id, name, type),
            financial_account:financial_accounts(id, name)`,
            { count: "exact" },
        );

    if (filters.entryType) {
        query = query.eq("entry_type", filters.entryType);
    }

    if (filters.categoryId) {
        query = query.eq("category_id", filters.categoryId);
    }

    if (filters.financialAccountId) {
        query = query.eq("financial_account_id", filters.financialAccountId);
    }

    if (filters.seasonId) {
        query = query.eq("season_id", filters.seasonId);
    }

    if (filters.search) {

        query = query.ilike("description", `%${filters.search.trim()}%`);

    }

    query = query.order(

        filters.sortBy === "amount" ? "amount" : "entry_date",

        { ascending: filters.order === "asc" },

    );

    query = query.range(

        pagination.page * pagination.pageSize,

        pagination.page * pagination.pageSize
        + pagination.pageSize
        - 1,

    );

    const { data, error, count } = await query;

    if (error) {
        throw error;
    }

    return {

        entries: (data ?? []) as AccountingEntryWithDetails[],

        total: count ?? 0,

    };

}

export interface SeasonAccountingSummary {

    totalIncome: number;

    totalExpense: number;

}

export async function getSeasonAccountingSummary(
    seasonId: string,
): Promise<SeasonAccountingSummary> {

    const { data, error } = await supabase
        .from("accounting_entries")
        .select("entry_type, amount")
        .eq("season_id", seasonId);

    if (error) {
        throw error;
    }

    const rows = data ?? [];

    const totalIncome = rows

        .filter((r) => r.entry_type === "income")

        .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = rows

        .filter((r) => r.entry_type === "expense")

        .reduce((sum, r) => sum + r.amount, 0);

    return {

        totalIncome,

        totalExpense,

    };

}