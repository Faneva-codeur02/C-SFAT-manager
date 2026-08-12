import type { Database } from "@/types/database";
import type { Profile } from "@/types";

// Enums dérivés directement de la base — toujours synchronisés
export type ContributionStatus = Database["public"]["Enums"]["payment_status"];
export type PaymentMethod = Database["public"]["Enums"]["payment_method"];

// Types de table dérivés directement de la base
export type Season = Database["public"]["Tables"]["seasons"]["Row"];
export type ContributionPeriod = Database["public"]["Tables"]["contribution_periods"]["Row"];
export type MemberContribution = Database["public"]["Tables"]["member_contributions"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type PaymentAllocation = Database["public"]["Tables"]["payment_allocations"]["Row"];

// Vue "enrichie" pour l'affichage (jointure profile + period)
export interface MemberContributionWithDetails extends MemberContribution {

    profile: Pick<Profile, "id" | "nom" | "prenom" | "member_number">;

    contribution_period: ContributionPeriod;

}

// Payload pour créer un paiement + répartir sur une ou plusieurs cotisations
export interface CreatePaymentPayload {

    profile_id: string;

    amount: number;

    payment_method: PaymentMethod;

    payment_date: string;

    reference?: string;

    note?: string;

    financial_account_id?: string;

    // les cotisations à couvrir avec ce paiement
    allocations: Array<{
        member_contribution_id: string;
        allocated_amount: number;
    }>;

}