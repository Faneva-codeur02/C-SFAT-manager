import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";

interface Props {

    title: string;

    value: string | number;

    icon: LucideIcon;

    description?: string;

    color?: "blue" | "green" | "red" | "orange" | "purple";

}

const colors = {

    blue: {
        icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },

    green: {
        icon: "bg-green-500/10 text-green-600 dark:text-green-400",
    },

    red: {
        icon: "bg-red-500/10 text-red-600 dark:text-red-400",
    },

    orange: {
        icon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
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

}: Props) {

    return (

        <motion.div

            whileHover={{

                y: -6,

                scale: 1.02,

            }}

            whileTap={{

                scale: .98,

            }}

            transition={{

                duration: .2,

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
                                {value}
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