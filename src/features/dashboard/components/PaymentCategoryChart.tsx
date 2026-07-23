import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    ChartContainer,
    ChartTooltip,
} from "@/shared/components/charts";

import ChartLegend from "@/shared/components/charts/ChartLegend";

import { motion } from "framer-motion";

const data = [

    {
        name: "Cotisations",
        value: 58,
        color: "hsl(var(--chart-1))",
    },

    {
        name: "Dons",
        value: 22,
        color: "hsl(var(--chart-2))",
    },

    {
        name: "Concerts",
        value: 13,
        color: "hsl(var(--chart-3))",
    },

    {
        name: "Autres",
        value: 7,
        color: "hsl(var(--chart-4))",
    },

];

export default function PaymentCategoryChart() {

    return (

        <ChartContainer

            title="Répartition des recettes"

            description="Origine des revenus"

        >

            <motion.div

                initial={{

                    opacity: 0,

                    y: 20,

                }}

                whileInView={{

                    opacity: 1,

                    y: 0,

                }}

                viewport={{

                    once: true,

                }}

                transition={{

                    duration: .45,

                }}

                className="flex h-full flex-col"

            >

                <div className="flex-1">

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie

                                data={data}

                                dataKey="value"

                                nameKey="name"

                                cx="50%"

                                cy="50%"

                                innerRadius={55}

                                outerRadius={90}

                                paddingAngle={4}

                                cornerRadius={8}

                                animationDuration={900}

                            >

                                {

                                    data.map((entry) => (

                                        <Cell

                                            key={entry.name}

                                            fill={entry.color}

                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip

                                content={<ChartTooltip />}

                            />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">

                    {

                        data.map(item => (

                            <ChartLegend

                                key={item.name}

                                color={item.color}

                                label={`${item.name} (${item.value}%)`}

                            />

                        ))

                    }

                </div>

            </motion.div>

        </ChartContainer>

    );

}