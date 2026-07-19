import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/shared/components/ui/tooltip";
import { motion } from "framer-motion";

import { useSidebar } from "@/shared/context/sidebar/useSidebar";

interface Props {

    title: string;

    url: string;

    icon: LucideIcon;

    collapsed: boolean;

}

export default function NavItem({

    title,

    url,

    icon: Icon,

}: Props) {

    const { collapsed } = useSidebar();

    return (

        <Tooltip>

            <TooltipTrigger>

                <NavLink

                    to={url}

                    end

                    className={({ isActive }) =>

                        cn(

                            "flex items-center rounded-lg transition-all duration-300",

                            collapsed
                                ? "justify-center p-2"
                                : "gap-3 px-3 py-2",

                            isActive

                                ? "bg-sidebar-primary text-sidebar-primary-foreground"

                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

                        )

                    }

                >

                    <Icon
                        size={20}
                        className="shrink-0"
                    />

                    <motion.span
                        initial={false}
                        animate={{
                            opacity: collapsed ? 0 : 1,
                            width: collapsed ? 0 : "auto",
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="overflow-hidden whitespace-nowrap"
                    >
                        {title}
                    </motion.span>
                </NavLink>

            </TooltipTrigger>

            {

                collapsed && (

                    <TooltipContent

                        side="right"

                    >

                        {title}

                    </TooltipContent>

                )

            }

        </Tooltip>

    );

}