import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import ChartContainer from "./charts/ChartContainer";
import ChartTooltip from "./charts/ChartTooltip";

const data = [
    { month: "Jan", amount: 65000 },
    { month: "Fév", amount: 72000 },
    { month: "Mar", amount: 81000 },
    { month: "Avr", amount: 95000 },
    { month: "Mai", amount: 102000 },
    { month: "Juin", amount: 118000 },
    { month: "Juil", amount: 132000 },
];

export default function MonthlyContributionChart() {

    return (

        <ChartContainer

            title="Évolution des cotisations"

            description="Cotisations mensuelles"

        >

            <ResponsiveContainer>

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="fillContribution"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="hsl(var(--primary))"
                                stopOpacity={0.45}
                            />

                            <stop
                                offset="95%"
                                stopColor="hsl(var(--primary))"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid
                        strokeDasharray="4 4"
                        opacity={0.15}
                    />

                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tickFormatter={(v) => `${v / 1000}k`}
                        tickLine={false}
                        axisLine={false}
                    />

                    <Tooltip

                        content={<ChartTooltip />}

                    />

                    <Area

                        type="monotone"

                        dataKey="amount"

                        stroke="hsl(var(--primary))"

                        strokeWidth={3}

                        fill="url(#fillContribution)"

                    />

                </AreaChart>

            </ResponsiveContainer>
        </ChartContainer>

    );

}