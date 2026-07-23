import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    ChartContainer,
    ChartTooltip,
} from "@/shared/components/charts";

const data = [

    {
        month: "Jan",
        members: 42,
    },

    {
        month: "Fév",
        members: 47,
    },

    {
        month: "Mar",
        members: 50,
    },

    {
        month: "Avr",
        members: 54,
    },

    {
        month: "Mai",
        members: 58,
    },

    {
        month: "Juin",
        members: 62,
    },

    {
        month: "Juil",
        members: 66,
    },

    {
        month: "Août",
        members: 69,
    },

];

export default function MemberEvolutionChart() {

    return (

        <ChartContainer

            title="Évolution des membres"

            description="Nombre de membres inscrits"

        >

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="membersGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="0%"
                                stopColor="hsl(var(--primary))"
                                stopOpacity={0.35}
                            />

                            <stop
                                offset="100%"
                                stopColor="hsl(var(--primary))"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.25}
                    />

                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        width={30}
                    />

                    <Tooltip
                        content={<ChartTooltip />}
                    />

                    <Area
                        type="monotone"
                        dataKey="members"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        fill="url(#membersGradient)"
                        activeDot={{
                            r: 6,
                        }}
                    />

                </AreaChart>

            </ResponsiveContainer>

        </ChartContainer>

    );

}