import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";

import type {
    PaymentCategory,
} from "../types/dashboard.types";

interface Props {

    data: PaymentCategory[];

}

const COLORS = [

    "hsl(var(--primary))",

    "hsl(var(--chart-2))",

    "hsl(var(--chart-3))",

    "hsl(var(--chart-4))",

];

export default function PaymentCategoryChart({

    data,

}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Répartition des recettes

                </CardTitle>

            </CardHeader>

            <CardContent className="h-[300px]">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="value"

                            nameKey="name"

                            innerRadius={70}

                            outerRadius={100}

                            paddingAngle={3}

                        >

                            {

                                data.map((_, index) => (

                                    <Cell

                                        key={index}

                                        fill={

                                            COLORS[index % COLORS.length]

                                        }

                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip

                            formatter={(value) => [

                                `${Number(value)} %`,

                                "Pourcentage",

                            ]}

                        />

                    </PieChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}