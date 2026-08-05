import type { LucideIcon } from "lucide-react";

import type {
    StatColor,
} from "@/features/dashboard/types/dashboard.types";
import { Card } from "../ui/card";

export interface StatCardProps {

    title: string;

    value: number;

    description?: string;

    icon: LucideIcon;

    color: StatColor;

    trend?: number;

    index?: number;

}

export default function StatCard({

    title,

    value,

    color,

}: StatCardProps) {

    return (

        <Card className="p-5">

            <p className="text-sm text-muted-foreground">

                {title}

            </p>

            <p
                className={`text-3xl font-bold ${color}`}
            >

                {value}

            </p>

        </Card>

    );

}