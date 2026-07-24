import type { LucideIcon } from "lucide-react";


export type StatColor =
    | "blue"
    | "green"
    | "orange"
    | "red"
    | "purple";

export interface DashboardStat {

    id: string;

    title: string;

    value: number;

    description: string;

    icon: LucideIcon;

    color: StatColor;

    trend?: number;

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

    icon: LucideIcon;

    color: StatColor;

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
