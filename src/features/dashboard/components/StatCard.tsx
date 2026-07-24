import { motion } from "framer-motion";

import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";

import type {
    LucideIcon,
} from "lucide-react";

import type {
    StatColor,
} from "../types/dashboard.types";

import AnimatedCounter from "@/shared/components/animation/AnimatedCounter";

interface Props {

    title: string;

    value: number;

    description: string;

    icon: LucideIcon;

    color: StatColor;

    trend?: number;

    index?: number;

}

const colors: Record<
    StatColor,
    {
        icon: string;
    }
> = {

    blue: {
        icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },

    green: {
        icon: "bg-green-500/10 text-green-600 dark:text-green-400",
    },

    orange: {
        icon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },

    red: {
        icon: "bg-red-500/10 text-red-600 dark:text-red-400",
    },

    purple: {
        icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },

};

export default function StatCard({

    title,

    value,

    icon: Icon,

    description,

    color = "blue",

    trend,



}: Props) {


    return (

        <motion.div

            initial={{

                opacity: 0,

                y: 20,

                scale: .95,

            }}

            animate={{

                opacity: 1,

                y: 0,

                scale: 1,

            }}

            whileHover={{

                y: -6,

                scale: 1.02,

            }}

            transition={{

                duration: .35,

            }}

        >

            <Card
                className="
                    h-full
                    overflow-hidden
                    border
                    shadow-sm
                    transition-shadow
                    hover:shadow-lg
                "
            >

                <CardContent className="p-5">

                    <div className="flex items-start justify-between">

                        <div className="space-y-2">

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-muted-foreground
                                "
                            >
                                {title}
                            </p>

                            <h3
                                className="
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                "
                            >

                                <AnimatedCounter

                                    value={value}

                                />

                            </h3>

                            {

                                description && (

                                    <p
                                        className="
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {description}
                                    </p>

                                )

                            }

                            {
                                trend !== undefined && (

                                    <div
                                        className={cn(

                                            "mt-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",

                                            trend >= 0
                                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                                : "bg-red-500/10 text-red-600 dark:text-red-400"

                                        )}
                                    >

                                        {

                                            trend >= 0

                                                ? `+${trend}%`

                                                : `${trend}%`

                                        }

                                    </div>

                                )
                            }
                        </div>

                        <div

                            className={cn(

                                "flex h-12 w-12 items-center justify-center rounded-xl",

                                colors[color].icon

                            )}

                        >

                            <Icon size={24} />

                        </div>

                    </div>

                </CardContent>

            </Card>

        </motion.div>

    );

}