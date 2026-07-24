import { Inbox } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";

interface Props {

    onRefresh?: () => void;

}

export default function DashboardEmpty({

    onRefresh,

}: Props) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                scale: .95,
            }}

            animate={{
                opacity: 1,
                scale: 1,
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
                    bg-primary/10
                "
            >

                <Inbox

                    size={42}

                    className="text-primary"

                />

            </div>

            <h2 className="text-2xl font-bold">

                Aucun résultat

            </h2>

            <p
                className="
                    mt-2
                    max-w-md
                    text-muted-foreground
                "
            >

                Il n'y a encore aucune donnée disponible
                pour afficher le tableau de bord.

            </p>

            {

                onRefresh && (

                    <Button

                        className="mt-6"

                        onClick={onRefresh}

                    >

                        Actualiser

                    </Button>

                )

            }

        </motion.div>

    );

}