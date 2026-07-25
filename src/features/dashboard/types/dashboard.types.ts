import type { LucideIcon } from "lucide-react";


export type StatColor =
    | "blue"
    | "green"
    | "orange"
    | "red"
    | "purple";

export interface DashboardStat {

    title: string;

    value: number;

    description: string;

    icon: LucideIcon;

    color: StatColor;

    trend?: number;

    suffix?: string;

}

export interface MonthlyContribution {

    month: string;

    amount: number;

}

export interface MemberEvolution {

    month: string;

    members: number;

}

export interface PaymentCategory {

    name: string;

    value: number;

}

export interface Activity {

    id: string;

    title: string;

    description: string;

    date: string;

    type:
    | "member"
    | "payment"
    | "invitation"
    | "event";

}

export interface DashboardData {

    stats: DashboardStat[];

    monthlyContributions: MonthlyContribution[];

    memberEvolution: MemberEvolution[];

    paymentCategories: PaymentCategory[];

    recentActivities: Activity[];

    quickActions: QuickAction[];

}

export interface QuickAction {

    id: string;

    title: string;

    icon: LucideIcon;

    color: StatColor;

    href: string;

}

export interface DashboardStats {

    totalMembers: number;

    totalRevenue: number;

    pendingContributions: number;

    partialContributions: number;

    cancelledContributions: number;

    activeInvitations: number;

}