import { motion } from "framer-motion";
import {
    Users,
    Wallet,
    TriangleAlert,
    CalendarDays,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsCards() {

    const stats = [

        {
            title: "Membres",
            value: 48,
            icon: Users,
            color: "blue" as const,
            description: "+3 ce mois-ci",
        },

        {
            title: "Cotisations",
            value: "132 000 Ar",
            icon: Wallet,
            color: "green" as const,
            description: "Juillet 2026",
        },

        {
            title: "En retard",
            value: 6,
            icon: TriangleAlert,
            color: "red" as const,
            description: "À régulariser",
        },

        {
            title: "Évènements",
            value: 2,
            icon: CalendarDays,
            color: "orange" as const,
            description: "Ce mois",
        },

    ];

    return (

        <motion.section

            initial="hidden"

            animate="visible"

            variants={{

                hidden: {},

                visible: {

                    transition: {

                        staggerChildren: .08,

                    },

                },

            }}

            className="
                grid
                gap-5
                sm:grid-cols-2
                xl:grid-cols-4
            "

        >

            {

                stats.map((stat) => (

                    <motion.div

                        key={stat.title}

                        variants={{

                            hidden: {

                                opacity: 0,

                                y: 20,

                            },

                            visible: {

                                opacity: 1,

                                y: 0,

                            },

                        }}

                    >

                        <StatCard {...stat} />

                    </motion.div>

                ))

            }

        </motion.section>

    );

}