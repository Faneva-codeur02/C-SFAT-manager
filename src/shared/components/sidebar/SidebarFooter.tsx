
import { motion } from "framer-motion";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useProfile } from "@/features/auth/hooks/useProfile";

import { useSidebar } from "@/shared/context/sidebar/useSidebar";

import { cn } from "@/shared/utils/utils";

interface Props {
    className?: string;
}

export default function SidebarFooter({
    className,
}: Props) {

    const { collapsed } = useSidebar();

    const { user } = useAuth();

    const profile = useProfile(user?.id);

    return (

        <footer
            className={cn(
                "border-t p-4",
                className
            )}
        >

            {

                collapsed ? (

                    <div className="flex justify-center">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-primary
                                font-semibold
                                text-primary-foreground
                            "
                        >

                            {profile?.prenom?.charAt(0)}

                        </div>

                    </div>

                ) : (

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-primary
                                font-semibold
                                text-primary-foreground
                                shrink-0
                            "
                        >

                            {profile?.prenom?.charAt(0)}

                        </div>

                        <motion.div

                            initial={false}

                            animate={{

                                opacity: 1,

                                width: "auto",

                            }}

                            transition={{

                                duration: .18,

                            }}

                            className="overflow-hidden"

                        >

                            <p className="font-semibold whitespace-nowrap  text-sidebar-foreground">

                                {profile?.prenom}

                            </p>

                            <p className="text-xs text-muted-foreground whitespace-nowrap">

                                {profile?.role}

                            </p>

                        </motion.div>

                    </div>

                )

            }

        </footer>

    );

}
