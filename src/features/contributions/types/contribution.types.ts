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

export type SelectedMember = Pick<Profile, "id" | "nom" | "prenom" | "member_number">;

// Vue "enrichie" pour l'affichage (jointure profile + period)
export interface MemberContributionWithDetails extends MemberContribution {

    profile: Pick<Profile, "id" | "nom" | "prenom" | "member_number">;

    contribution_period: ContributionPeriod;

}

// Maintenant : plus besoin, la répartition est automatique côté serveur
export interface CreatePaymentPayload {

    profile_id: string;

    amount: number;

    payment_method: PaymentMethod;

    payment_date: string;

    financial_account_id: string;

    reference?: string;

    note?: string;

}

// pour afficher le détail d'un paiement après coup (reçu, historique)
export interface PaymentAllocationWithPeriod {

    id: string;

    allocated_amount: number;

    contribution_period: ContributionPeriod;

}

export interface MemberYearGridRow {

    profile: Pick<import("@/types").Profile, "id" | "nom" | "prenom" | "member_number">;

    months: Array<{

        contributionPeriodId: string;

        periodStart: string;

        amountDue: number;

        amountPaid: number;

        status: ContributionStatus;

    } | null>;

}

export interface ContributionSummary {

    monthsOwed: number;

    totalDue: number;

    lastPaidPeriodStart: string | null;

}