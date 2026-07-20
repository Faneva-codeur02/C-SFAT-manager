import { motion } from "framer-motion";
import {
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { useSidebar } from "@/shared/context/sidebar/useSidebar";

interface Props {
    collapsed: boolean;
}

export default function SidebarLogo({
    collapsed,
}: Props) {

    const { toggle } = useSidebar();

    return (

        <div
            className="
                group
                relative
                flex
                h-10
                items-center
                overflow-hidden
            "
        >

            {/* ------------------ SIDEBAR OUVERT ------------------ */}

            {!collapsed && (

                <>

                    <motion.div

                        layout

                        className="
                            flex
                            flex-1
                            items-center
                            gap-3
                        "

                    >

                        <img
                            src="/logo_csfat.png"
                            className="h-10 w-10 rounded-full"
                        />

                        <div>

                            <h1 className="font-bold">
                                C-SFAT
                            </h1>

                            <p className="text-xs text-muted-foreground">
                                Manager
                            </p>

                        </div>

                    </motion.div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggle}
                        className="
        h-8
        w-8
        rounded-lg
        shrink-0
        hover:bg-muted
        transition-colors
    "
                    >
                        <PanelLeftClose size={18} />
                    </Button>
                </>

            )}

            {/* ------------------ SIDEBAR FERME ------------------ */}

            {collapsed && (

                <div
                    className="
                        relative
                        h-10
                        w-full
                    "
                >

                    {/* LOGO */}

                    <motion.div

                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                        "

                        initial={false}

                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            filter: "blur(0px)",
                        }}

                        whileHover={{
                            opacity: 0,
                            x: -10,
                            scale: .85,
                            filter: "blur(3px)",
                        }}

                        transition={{
                            duration: .18,
                        }}

                    >

                        <img
                            src="/logo_csfat.png"
                            className="h-10 w-10 rounded-full"
                        />

                    </motion.div>

                    {/* BOUTON */}

                    <motion.div

                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            pointer-events-none
                        "

                        initial={false}

                        animate={{
                            opacity: 0,
                            x: 10,
                            scale: .85,
                        }}

                        whileHover={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}

                        transition={{
                            duration: .18,
                        }}

                    >

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggle}
                            className="pointer-events-auto"
                        >

                            <PanelLeftOpen size={18} />

                        </Button>

                    </motion.div>

                </div>

            )}

        </div>

    );

}