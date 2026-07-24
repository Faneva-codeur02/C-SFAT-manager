import {
    ResponsiveContainer,
    LineChart,
    Line,
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
    MemberEvolution,
} from "../types/dashboard.types";

interface Props {

    data: MemberEvolution[];

}

export default function MemberEvolutionChart({

    data,

}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Évolution des membres

                </CardTitle>

            </CardHeader>

            <CardContent className="h-[300px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

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
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            formatter={(value) => [

                                Number(value),

                                "Membres",

                            ]}
                        />

                        <Line

                            type="monotone"

                            dataKey="members"

                            stroke="hsl(var(--primary))"

                            strokeWidth={3}

                            dot={{
                                r: 4,
                            }}

                            activeDot={{
                                r: 6,
                            }}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}