import { motion, AnimatePresence } from "framer-motion";
import {
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { useSidebar } from "@/shared/context/sidebar/useSidebar";
import { useIsMobile } from "@/shared/hooks/useIsMobile";


export default function SidebarLogo() {

    const {
        collapsed,
        toggle,
    } = useSidebar();

    const isMobile = useIsMobile();

    return (

        <div className="relative flex h-10 items-center">

            {/* ================= SIDEBAR OUVERTE ================= */}

            <AnimatePresence mode="wait">

                {

                    !collapsed && (

                        <motion.div

                            key="expanded"

                            initial={{
                                opacity: 0,
                                x: -8,
                            }}

                            animate={{
                                opacity: 1,
                                x: 0,
                            }}

                            exit={{
                                opacity: 0,
                                x: -8,
                            }}

                            transition={{
                                duration: .18,
                            }}

                            className="flex w-full items-center justify-between"

                        >

                            <div className="flex items-center gap-3">

                                <img
                                    src="/logo_csfat.png"
                                    alt="Logo"
                                    className="h-10 w-10 rounded-full shrink-0"
                                />

                                <div className="min-w-0">

                                    <h1
                                        className="
                                            truncate
                                            text-sm
                                            font-semibold
                                            text-sidebar-foreground
                                        "
                                    >
                                        C-SFAT
                                    </h1>

                                    <p
                                        className="
                                            text-xs
                                            text-sidebar-foreground/70
                                        "
                                    >
                                        Manager
                                    </p>

                                </div>

                            </div>

                            {!isMobile && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggle}
                                    className="
                                        h-8
                                        w-8
                                        shrink-0
                                        rounded-md
                                        text-sidebar-foreground
                                        hover:bg-sidebar-accent
                                        hover:text-sidebar-accent-foreground
                                    "
                                >
                                    <PanelLeftClose size={18} />
                                </Button>
                            )}

                        </motion.div>

                    )

                }

            </AnimatePresence>

            {/* ================= SIDEBAR FERMÉE ================= */}

            <AnimatePresence mode="wait">

                {

                    collapsed && (

                        <motion.div

                            key="collapsed"

                            initial={{
                                opacity: 0,
                            }}

                            animate={{
                                opacity: 1,
                            }}

                            exit={{
                                opacity: 0,
                            }}

                            className="
                                group
                                relative
                                flex
                                h-10
                                w-full
                                items-center
                                justify-center
                            "

                        >

                            {/* Logo */}

                            <motion.img

                                src="/logo_csfat.png"

                                alt="Logo"

                                className="
                                    absolute
                                    h-10
                                    w-10
                                    rounded-full
                                "

                                whileHover={{
                                    opacity: 0,
                                    scale: .85,
                                    x: -8,
                                    filter: "blur(2px)",
                                }}

                                transition={{
                                    duration: .18,
                                }}

                            />

                            {/* Bouton ouvrir */}

                            <motion.div

                                className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    justify-center
                                "

                                initial={{
                                    opacity: 0,
                                }}

                                whileHover={{
                                    opacity: 1,
                                }}

                                transition={{
                                    duration: .18,
                                }}

                            >

                                <Button

                                    variant="ghost"

                                    size="icon"

                                    onClick={toggle}

                                    className="
                                        opacity-0
                                        group-hover:opacity-100
                                        transition-opacity
                                        text-sidebar-foreground
                                        hover:bg-sidebar-accent
                                        hover:text-sidebar-accent-foreground
                                    "

                                >

                                    <PanelLeftOpen size={18} />

                                </Button>

                            </motion.div>

                        </motion.div>

                    )

                }

            </AnimatePresence>

        </div>

    );

}