import type { Database } from "@/types/database";

export type FinancialAccount = Database["public"]["Tables"]["financial_accounts"]["Row"];

export type AccountCategory = Database["public"]["Tables"]["account_categories"]["Row"];

export type AccountingEntry = Database["public"]["Tables"]["accounting_entries"]["Row"];

export interface CreateManualEntryPayload {

    category_id: string;

    financial_account_id: string;

    entry_type: "income" | "expense";

    amount: number;

    entry_date: string;

    description?: string;

}

export interface AccountingEntryWithDetails extends AccountingEntry {

    category: Pick<AccountCategory, "id" | "name" | "type">;

    financial_account: Pick<FinancialAccount, "id" | "name">;

}