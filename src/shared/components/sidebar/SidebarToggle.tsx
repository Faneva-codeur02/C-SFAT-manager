import { motion } from "framer-motion";
import {
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { useSidebar } from "@/shared/context/sidebar/useSidebar";

interface Props {

    className?: string;

}

export default function SidebarToggle({

    className,

}: Props) {

    const {

        collapsed,

        toggle,

    } = useSidebar();

    return (

        <Button

            variant="ghost"

            size="icon"

            onClick={toggle}

            className={`
                h-8
                w-8
                rounded-md
                opacity-50
                transition-all
                duration-200
                hover:opacity-100
                ${className ?? ""}
            `}

        >

            <motion.div

                animate={{
                    rotate: collapsed ? 180 : 0,
                }}

                transition={{
                    duration: 0.25,
                }}

            >

                {

                    collapsed

                        ? <PanelLeftOpen size={18} />

                        : <PanelLeftClose size={18} />

                }

            </motion.div>

        </Button>

    );

}