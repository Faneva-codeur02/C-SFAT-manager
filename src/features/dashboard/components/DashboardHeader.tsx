import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useProfile } from "@/features/auth/hooks/useProfile";

export default function DashboardHeader() {

    const { user } = useAuth();

    const profile = useProfile(user?.id);

    const today = new Date().toLocaleDateString(
        "fr-FR",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: .35,
            }}

            className="
                mb-8
                flex
                flex-col
                gap-5
                md:flex-row
                md:items-center
                md:justify-between
            "

        >

            {/* Partie gauche */}

            <div>

                <motion.h2

                    initial={{
                        opacity: 0,
                        x: -20,
                    }}

                    animate={{
                        opacity: 1,
                        x: 0,
                    }}

                    transition={{
                        delay: .1,
                    }}

                    className="
                        text-3xl
                        font-bold
                        tracking-tight
                    "

                >

                    Bonjour,

                    <span className="text-primary">

                        {" "}

                        {profile?.prenom ?? "Utilisateur"}

                    </span>

                    👋

                </motion.h2>

                <motion.p

                    initial={{
                        opacity: 0,
                    }}

                    animate={{
                        opacity: 1,
                    }}

                    transition={{
                        delay: .25,
                    }}

                    className="
                        mt-2
                        text-muted-foreground
                    "

                >

                    Bienvenue sur

                    <span className="font-medium">

                        {" "}C-SFAT Manager

                    </span>

                    . Nous vous souhaitons une excellente journée.

                </motion.p>

            </div>

            {/* Partie droite */}

            <motion.div

                initial={{
                    opacity: 0,
                    x: 20,
                }}

                animate={{
                    opacity: 1,
                    x: 0,
                }}

                transition={{
                    delay: .15,
                }}

                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    bg-card
                    px-4
                    py-3
                    text-sm
                    shadow-sm
                "

            >

                <CalendarDays
                    size={18}
                    className="text-primary"
                />

                <span className="capitalize">

                    {today}

                </span>

            </motion.div>

        </motion.div>

    );

}