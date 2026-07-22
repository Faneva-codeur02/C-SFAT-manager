import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useSidebar } from "@/shared/context/sidebar/useSidebar";
import { cn } from "@/shared/utils/utils";

import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/shared/components/ui/tooltip";

import type { NavigationItem } from "@/types/navigation";

interface Props {

    title: string;

    icon: LucideIcon;

    items: NonNullable<NavigationItem["children"]>;

}

export default function SidebarGroup({

    title,

    icon: Icon,

    items,

}: Props) {

    const location = useLocation();

    const { collapsed } = useSidebar();

    const isGroupActive = items.some(

        item =>

            item.url &&
            location.pathname.startsWith(item.url)

    );

    const [open, setOpen] = useState(isGroupActive);

    useEffect(() => {

        if (isGroupActive) {

            setOpen(true);

        }

    }, [isGroupActive]);

    return (

        <div className="space-y-1">

            <Tooltip>

                <TooltipTrigger

                    onClick={() => setOpen(!open)}

                    className={cn(

                        "group flex w-full items-center rounded-lg transition-all duration-200",

                        collapsed

                            ? "justify-center p-2"

                            : "justify-between px-3 py-2",

                        isGroupActive

                            ? "bg-sidebar-primary text-sidebar-primary-foreground"

                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

                    )}

                >

                    <div

                        className={cn(

                            "flex items-center",

                            collapsed

                                ? ""

                                : "gap-3"

                        )}

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

                                duration: .18,

                            }}

                            className="overflow-hidden whitespace-nowrap"

                        >

                            {title}

                        </motion.span>

                    </div>

                    {

                        !collapsed && (

                            <motion.div

                                animate={{

                                    rotate: open ? 180 : 0

                                }}

                                transition={{

                                    duration: .18

                                }}

                            >

                                <ChevronDown size={16} />

                            </motion.div>

                        )

                    }

                </TooltipTrigger>

                {

                    collapsed && (

                        <TooltipContent

                            side="right"

                            sideOffset={10}

                        >

                            {title}

                        </TooltipContent>

                    )

                }

            </Tooltip>

            <AnimatePresence>

                {

                    open && (

                        <motion.div

                            initial={{

                                height: 0,

                                opacity: 0,

                            }}

                            animate={{

                                height: "auto",

                                opacity: 1,

                            }}

                            exit={{

                                height: 0,

                                opacity: 0,

                            }}

                            transition={{

                                duration: .22,

                            }}

                            className={cn(

                                "space-y-1 overflow-hidden",

                                !collapsed && "ml-7"

                            )}

                        >

                            {

                                items.map((item) => {

                                    if (!item.url) return null;

                                    const ChildIcon = item.icon;

                                    return (

                                        <Tooltip

                                            key={item.url}

                                        >

                                            <TooltipTrigger>

                                                <NavLink

                                                    to={item.url}

                                                    end

                                                    className={({ isActive }) =>

                                                        cn(

                                                            "group flex items-center rounded-lg transition-all duration-200",

                                                            collapsed

                                                                ? "justify-center p-2"

                                                                : "gap-3 px-3 py-2 text-sm",

                                                            isActive

                                                                ? "bg-sidebar-primary text-sidebar-primary-foreground"

                                                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

                                                        )

                                                    }

                                                >

                                                    <ChildIcon

                                                        size={16}

                                                        className="shrink-0"

                                                    />

                                                    <motion.span

                                                        initial={false}

                                                        animate={{

                                                            opacity: collapsed ? 0 : 1,

                                                            width: collapsed ? 0 : "auto",

                                                        }}

                                                        transition={{

                                                            duration: .18,

                                                        }}

                                                        className="overflow-hidden whitespace-nowrap"

                                                    >

                                                        {item.title}

                                                    </motion.span>

                                                </NavLink>

                                            </TooltipTrigger>

                                            {

                                                collapsed && (

                                                    <TooltipContent

                                                        side="right"

                                                        sideOffset={10}

                                                    >

                                                        {item.title}

                                                    </TooltipContent>

                                                )

                                            }

                                        </Tooltip>

                                    );

                                })

                            }

                        </motion.div>

                    )

                }

            </AnimatePresence>

        </div>

    );

}
