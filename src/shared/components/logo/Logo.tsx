import { useSidebar } from "@/shared/context/sidebar/useSidebar";
import { cn } from "@/shared/utils/utils";
import { motion } from "framer-motion";

interface LogoProps {
    collapsed?: boolean;
}

export default function Logo({
}: LogoProps) {

    const { collapsed } = useSidebar();

    return (
        <div
            className={cn(
                "flex items-center transition-all duration-300",
                collapsed ? "justify-center" : "gap-3"
            )}
        >
            <img
                src="/logo_csfat.png"
                alt="C-SFAT"
                className="h-10 w-10"
            />

            <motion.div
                initial={false}
                animate={{
                    opacity: collapsed ? 0 : 1,
                    width: collapsed ? 0 : "auto",
                }}
                transition={{
                    duration: 0.25,
                }}
                className="overflow-hidden"
            >
                <h1 className="font-bold whitespace-nowrap">
                    C-SFAT
                </h1>

                <p className="text-xs text-muted-foreground whitespace-nowrap">
                    Manager
                </p>
            </motion.div>
        </div>
    );
}