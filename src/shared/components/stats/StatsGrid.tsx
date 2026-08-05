import { motion } from "framer-motion";

import StatCard, {

    type StatCardProps,

} from "./StatCard";

interface Props {

    stats: StatCardProps[];

}

export default function StatsGrid({

    stats,

}: Props) {

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

                stats.map((stat, index) => (

                    <StatCard

                        key={stat.title}

                        index={index}

                        {...stat}

                    />

                ))

            }

        </motion.section>

    );

}