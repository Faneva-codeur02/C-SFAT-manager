import StatCard from "./StatCard";

import type {
    DashboardStat,
} from "../types/dashboard.types";

interface Props {

    stats: DashboardStat[];

}

export default function DashboardStats({

    stats,

}: Props) {

    return (

        <div
            className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-4
            "
        >

            {

                stats.map(stat => (

                    <StatCard

                        key={stat.title}

                        {...stat}

                    />

                ))

            }

        </div>

    );

}