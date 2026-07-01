import type { Database } from "./database";

export type Payment =
    Database["public"]["Tables"]["payments"]["Row"];

export type PaymentInsert =
    Database["public"]["Tables"]["payments"]["Insert"];

export type PaymentUpdate =
    Database["public"]["Tables"]["payments"]["Update"];