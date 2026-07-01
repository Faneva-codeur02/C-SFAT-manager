import type { Database } from "./database";

export type AccountingEntry =
    Database["public"]["Tables"]["accounting_entries"]["Row"];