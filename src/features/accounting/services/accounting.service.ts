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

    query = query

        .order(

            filters.sortBy === "amount" ? "amount" : "entry_date",

            { ascending: filters.order === "asc" },

        )

        .order("created_at", { ascending: false });

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

export interface CreateFinancialAccountPayload {

    name: string;

    account_type: FinancialAccount["account_type"];

    opening_balance: number;

    description?: string;

}

export interface UpdateFinancialAccountPayload {

    name?: string;

    description?: string;

    is_active?: boolean;

}

export async function createFinancialAccount(
    payload: CreateFinancialAccountPayload,
): Promise<FinancialAccount> {

    const { data, error } = await supabase
        .from("financial_accounts")
        .insert({
            name: payload.name,
            account_type: payload.account_type,
            opening_balance: payload.opening_balance,
            current_balance: payload.opening_balance,
            description: payload.description ?? null,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function updateFinancialAccount(
    id: string,
    payload: UpdateFinancialAccountPayload,
): Promise<FinancialAccount> {

    const { data, error } = await supabase
        .from("financial_accounts")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export interface CreateAccountCategoryPayload {

    name: string;

    type: "income" | "expense";

    description?: string;

}

export interface UpdateAccountCategoryPayload {

    name?: string;

    description?: string;

}

export async function createAccountCategory(
    payload: CreateAccountCategoryPayload,
): Promise<AccountCategory> {

    const { data, error } = await supabase
        .from("account_categories")
        .insert({
            name: payload.name,
            type: payload.type,
            description: payload.description ?? null,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function updateAccountCategory(
    id: string,
    payload: UpdateAccountCategoryPayload,
): Promise<AccountCategory> {

    const { data, error } = await supabase
        .from("account_categories")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}