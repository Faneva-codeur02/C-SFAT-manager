import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { useSidebar } from "@/shared/context/sidebar/useSidebar";

import SidebarLogo from "./SidebarLogo";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";

export default function MobileSidebar() {

    const {

        isMobile,

        mobileOpen,

        setMobileOpen,

    } = useSidebar();

    if (!isMobile) return null;

    return (

        <AnimatePresence>

            {

                mobileOpen && (

                    <>

                        {/* Overlay */}

                        <motion.div

                            initial={{ opacity: 0 }}

                            animate={{ opacity: 1 }}

                            exit={{ opacity: 0 }}

                            onClick={() =>

                                setMobileOpen(false)

                            }

                            className="
                                fixed
                                inset-0
                                z-40
                                bg-black/50
                                backdrop-blur-sm
                                md:hidden
                            "

                        />

                        {/* Sidebar */}

                        <motion.aside

                            initial={{

                                x: -320

                            }}

                            animate={{

                                x: 0

                            }}

                            exit={{

                                x: -320

                            }}

                            transition={{

                                duration: .25

                            }}

                            className="
                                fixed
                                left-0
                                top-0
                                z-50
                                flex
                                h-screen
                                w-64
                                flex-col
                                bg-sidebar
                                text-sidebar-foreground
                                border-r
                                md:hidden
                            "

                        >

                            <header className="border-b p-3">

                                <div className="flex items-center justify-between">

                                    <SidebarLogo />

                                    <Button

                                        variant="ghost"

                                        size="icon"

                                        onClick={() =>

                                            setMobileOpen(false)

                                        }

                                    >

                                        <X size={18} />

                                    </Button>

                                </div>

                            </header>

                            <SidebarNavigation />

                            <SidebarFooter />

                        </motion.aside>

                    </>

                )

            }

        </AnimatePresence>

    );

}