import { useState } from "react";
import {
    Bell,
    Menu,
    Search,
    ArrowLeft,
} from "lucide-react";

import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { usePageTitle } from "@/hooks/usePageTitle";
import { useSearch } from "@/shared/context/SearchContext";
import { useSidebar } from "@/shared/context/sidebar/useSidebar";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { AnimatePresence, motion } from "framer-motion";


export default function Header() {

    const title = usePageTitle();

    const {
        search,
        setSearch,
    } = useSearch();

    const isMobile = useIsMobile();

    const {
        toggleMobile,
    } = useSidebar();

    const [mobileSearch, setMobileSearch] = useState(false);

    // ===========================
    // HEADER RECHERCHE MOBILE
    // ===========================



    // ===========================
    // HEADER NORMAL
    // ===========================

    return (
        <AnimatePresence mode="wait">

            {

                isMobile && mobileSearch ? (

                    <motion.header

                        key="mobile-search"

                        initial={{
                            opacity: 0,
                            y: -8,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        exit={{
                            opacity: 0,
                            y: -8,
                        }}

                        transition={{
                            duration: .18,
                        }}

                        className="
                    sticky
                    top-0
                    z-30
                    flex
                    h-16
                    items-center
                    gap-3
                    border-b
                    bg-background/75
                    px-4
                    backdrop-blur-xl
                "

                    >

                        <motion.div

                            whileTap={{
                                scale: .95,
                            }}

                        >

                            <Button

                                variant="ghost"

                                size="icon"

                                onClick={() =>

                                    setMobileSearch(false)

                                }

                            >

                                <ArrowLeft size={20} />

                            </Button>

                        </motion.div>

                        <motion.div

                            layout

                            initial={{
                                opacity: 0,
                                scaleX: .95,
                            }}

                            animate={{
                                opacity: 1,
                                scaleX: 1,
                            }}

                            transition={{
                                duration: .18,
                            }}

                            className="relative flex-1"

                        >

                            <Search

                                size={16}

                                className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-muted-foreground
                        "

                            />

                            <Input

                                autoFocus

                                value={search}

                                placeholder="Rechercher..."

                                onChange={(e) =>

                                    setSearch(e.target.value)

                                }

                                className="pl-10"

                            />

                        </motion.div>

                    </motion.header>

                ) : (

                    <motion.header

                        key="default"

                        initial={{
                            opacity: 0,
                            y: 8,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        exit={{
                            opacity: 0,
                            y: 8,
                        }}

                        transition={{
                            duration: .18,
                        }}

                        className="
                    sticky
                    top-0
                    z-30
                    flex
                    h-16
                    items-center
                    justify-between
                    border-b
                    bg-background/75
                    px-4
                    md:px-6
                    backdrop-blur-xl
                "

                    >

                        {/* Partie gauche */}

                        <div className="flex items-center gap-2 md:gap-6">

                            {

                                isMobile && (

                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{
                                            scale: .95,
                                        }}
                                    >

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleMobile}
                                        >
                                            <Menu size={20} />
                                        </Button>

                                    </motion.div>

                                )

                            }

                            <motion.h1
                                layout
                                transition={{
                                    layout: {
                                        duration: .2,
                                    },
                                }}
                                className="
                                    truncate
                                    text-lg
                                    font-semibold
                                    md:text-xl
                                "
                            >
                                {title}
                            </motion.h1>

                            {/* Recherche Desktop */}

                            <div className="relative hidden md:block">

                                <Search
                                    size={16}
                                    className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-muted-foreground
                        "
                                />

                                <Input
                                    className="
                            w-72
                            lg:w-80
                            xl:w-96
                            pl-10
                        "
                                    placeholder="Rechercher..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        {/* Partie droite */}

                        <motion.div
                            layout
                            className="flex items-center gap-1 md:gap-3"
                        >

                            {

                                isMobile && (

                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{
                                            scale: .95,
                                        }}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setMobileSearch(true)
                                            }
                                        >

                                            <Search size={18} />

                                        </Button>
                                    </motion.div>
                                )

                            }
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: .95,
                                }}
                            >
                                <ThemeToggle />
                            </motion.div>

                            {

                                !isMobile && (

                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{
                                            scale: .95,
                                        }}
                                    >

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                        >

                                            <Bell size={18} />

                                        </Button>
                                    </motion.div>
                                )

                            }
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: .95,
                                }}
                            >

                                <UserMenu />
                            </motion.div>
                        </motion.div>

                    </motion.header>

                )

            }

        </AnimatePresence>


    );

}