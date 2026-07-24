import { TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";

interface Props {

    message?: string;

    onRetry?: () => void;

}

export default function DashboardError({

    message,

    onRetry,

}: Props) {

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

            className="
                flex
                min-h-[450px]
                flex-col
                items-center
                justify-center
                text-center
            "

        >

            <div
                className="
                    mb-6
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500/10
                "
            >

                <TriangleAlert

                    size={42}

                    className="text-red-500"

                />

            </div>

            <h2 className="text-2xl font-bold">

                Une erreur est survenue

            </h2>

            <p
                className="
                    mt-2
                    max-w-md
                    text-muted-foreground
                "
            >

                {

                    message ??

                    "Impossible de charger les données du tableau de bord."

                }

            </p>

            {

                onRetry && (

                    <Button

                        className="mt-6"

                        onClick={onRetry}

                    >

                        Réessayer

                    </Button>

                )

            }

        </motion.div>

    );

}