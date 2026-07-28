export interface ContributionRow {

    id: string;

    memberName: string;

    period: string;

    amountDue: number;

    amountPaid: number;

    remaining: number;

    status: "pending" | "partial" | "paid" | "cancelled";

}