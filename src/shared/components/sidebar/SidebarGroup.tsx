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


interface SidebarItem {

    title: string;

    url: string;

    icon?: LucideIcon;

}



interface Props {

    title: string;

    icon: LucideIcon;

    items: SidebarItem[];

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
            location.pathname.startsWith(
                item.url
            )
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



    return (

        <div className="space-y-1">


            {/* HEADER DU GROUPE */}

            <button

                onClick={() =>
                    setOpen(!open)
                }

                className={`
                    flex
                    items-center
                    justify-between
                    w-full
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    transition-all
                    
                    ${isGroupActive
                        ?
                        "text-primary"
                        :
                        "hover:bg-muted"
                    }
                `}

            >

                <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                >

                    <Icon size={20} />

                    <span>
                        {title}
                    </span>


                </div>


                <motion.div

                    animate={{
                        rotate: open ? 180 : 0
                    }}

                    transition={{
                        duration: 0.2
                    }}

                >

                    <ChevronDown
                        size={16}
                    />

                </motion.div>


            </button>



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

                            className="
                                ml-7
                                space-y-1
                                overflow-hidden
                            "

                        >

                            {
                                items.map(item => {

                                    const Icon =
                                        item.icon;


                                    return (

                                        <NavLink

                                            key={item.url}

                                            to={item.url}

                                            end

                                            className={({ isActive }) => `

                                        flex
                                        items-center
                                        gap-3
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-sm
                                        transition-all

                                        ${isActive
                                                    ?
                                                    "bg-primary text-primary-foreground"
                                                    :
                                                    "hover:bg-muted"
                                                }

                                  `}

                                        >

                                            {
                                                Icon && (
                                                    <Icon
                                                        size={16}
                                                    />
                                                )
                                            }


                                            <span>
                                                {item.title}
                                            </span>


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