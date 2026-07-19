import {
    ChevronDown,
} from "lucide-react";

import {
    NavLink,
    useLocation,
} from "react-router-dom";

import type {
    LucideIcon
} from "lucide-react";

import {
    useState,
    useEffect,
} from "react";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import type {
    NavigationItem
} from "@/types/navigation";
import { cn } from "@/shared/utils/utils";
import { useSidebar } from "@/shared/context/sidebar/useSidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";


interface Props {

    title: string;

    icon: LucideIcon;

    items: NonNullable<
        NavigationItem["children"]
    >;

    collapsed: boolean;

}



export default function SidebarGroup({

    title,

    icon: Icon,

    items,

}: Props) {


    const location =
        useLocation();


    const isGroupActive =
        items.some(item =>
            item.url &&
            location.pathname.startsWith(item.url)
        );


    const [open, setOpen] =
        useState(isGroupActive);



    useEffect(() => {


        if (isGroupActive) {

            setOpen(true);

        }


    }, [
        isGroupActive
    ]);

    const { collapsed } = useSidebar();


    return (

        <div className="space-y-1">


            {/* HEADER DU GROUPE */}
            <Tooltip>

                <TooltipTrigger>

                    <button

                        onClick={() =>

                            setOpen(!open)

                        }

                        className={cn(

                            "flex w-full items-center rounded-lg transition-all duration-300",

                            collapsed

                                ? "justify-center py-2"

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

                            <Icon size={20} />


                            {

                                !collapsed && (

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

                                )

                            }

                        </div>

                        {

                            !collapsed && (

                                <motion.div

                                    animate={{

                                        rotate: open ? 180 : 0

                                    }}

                                >

                                    <ChevronDown size={16} />

                                </motion.div>

                            )

                        }

                    </button>
                </TooltipTrigger>
                {

                    collapsed && (

                        <TooltipContent side="right">

                            {title}

                        </TooltipContent>

                    )

                }
            </Tooltip>



            {/* SOUS MENU */}

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
                                duration: 0.25,
                                ease: "easeInOut",
                            }}

                            className={cn(

                                "space-y-1 overflow-hidden",

                                collapsed

                                    ? ""

                                    : "ml-7"

                            )}

                        >

                            {
                                items.map(item => {

                                    if (!item.url) return null;


                                    const Icon = item.icon;


                                    return (

                                        <NavLink

                                            key={item.url}

                                            to={item.url}

                                            end

                                            className={({ isActive }) =>

                                                cn(

                                                    "flex items-center rounded-lg transition-all duration-300",

                                                    collapsed

                                                        ?

                                                        "justify-center py-2"

                                                        :

                                                        "gap-3 px-3 py-2 text-sm",

                                                    isActive

                                                        ?

                                                        "bg-sidebar-primary text-sidebar-primary-foreground"

                                                        :

                                                        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

                                                )

                                            }

                                        >

                                            {
                                                <Icon size={16} />
                                            }

                                            {

                                                !collapsed &&

                                                <motion.span
                                                    initial={false}
                                                    animate={{
                                                        opacity: collapsed ? 0 : 1,
                                                        width: collapsed ? 0 : "auto",
                                                    }}
                                                    className="overflow-hidden whitespace-nowrap"
                                                >
                                                    {item.title}
                                                </motion.span>

                                            }

                                        </NavLink>

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