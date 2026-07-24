import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/shared/components/ui/card";

import type {
    MonthlyContribution,
} from "../types/dashboard.types";

interface Props {

    data: MonthlyContribution[];

}

export default function MonthlyContributionChart({

    data,

}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Cotisations mensuelles

                </CardTitle>

            </CardHeader>

            <CardContent className="h-[320px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart
                        data={data}
                    >

                        <defs>

                            <linearGradient
                                id="contributionGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="hsl(var(--primary))"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="hsl(var(--primary))"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis

                            dataKey="month"

                            tickLine={false}

                            axisLine={false}

                        />

                        <YAxis

                            tickFormatter={(value) =>
                                `${value / 1000}k`
                            }

                            tickLine={false}

                            axisLine={false}

                        />

                        <Tooltip

                            formatter={(value) => {

                                const amount =
                                    Number(value);

                                return [

                                    `${amount.toLocaleString()} Ar`,

                                    "Cotisations",

                                ];

                            }}

                        />

                        <Area

                            type="monotone"

                            dataKey="amount"

                            stroke="hsl(var(--primary))"

                            fill="url(#contributionGradient)"

                            strokeWidth={3}

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}