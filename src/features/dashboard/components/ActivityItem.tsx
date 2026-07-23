import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {

    icon: LucideIcon;

    title: string;

    description: string;

    time: string;

    color: string;

}

export default function ActivityItem({

    icon: Icon,

    title,

    description,

    time,

    color,

}: Props) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 10,
            }}

            whileInView={{
                opacity: 1,
                y: 0,
            }}

            viewport={{
                once: true,
            }}

            transition={{
                duration: .25,
            }}

            className="
                flex
                items-start
                gap-4
                rounded-xl
                p-3
                transition-colors
                hover:bg-muted/40
            "

        >

            <div

                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-white
                    shrink-0
                "

                style={{
                    backgroundColor: color,
                }}

            >

                <Icon size={20} className="shrink-0 text-foreground" />

            </div>

            <div className="flex-1">

                <h4 className="font-medium">

                    {title}

                </h4>

                <p className="text-sm text-muted-foreground">

                    {description}

                </p>

            </div>

            <span className="text-xs text-muted-foreground whitespace-nowrap">

                {time}

            </span>

        </motion.div>

    );

}