import { motion } from "framer-motion";

import {
    UserPlus,
    Wallet,
    CalendarPlus,
    FileText,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";

interface Action {

    title: string;

    icon: React.ElementType;

    color: string;

    onClick: () => void;

}

export default function QuickActions() {

    const actions: Action[] = [

        {

            title: "Nouveau membre",

            icon: UserPlus,

            color: "text-blue-500",

            onClick: () => {

                console.log("Nouveau membre");

            },

        },

        {

            title: "Nouvelle cotisation",

            icon: Wallet,

            color: "text-green-500",

            onClick: () => {

                console.log("Nouvelle cotisation");

            },

        },

        {

            title: "Nouvel évènement",

            icon: CalendarPlus,

            color: "text-orange-500",

            onClick: () => {

                console.log("Nouvel évènement");

            },

        },

        {

            title: "Rapport",

            icon: FileText,

            color: "text-violet-500",

            onClick: () => {

                console.log("Rapport");

            },

        },

    ];

    return (

        <Card className="shadow-sm">

            <CardHeader>

                <CardTitle>

                    Actions rapides

                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="grid gap-3">

                    {

                        actions.map((action) => {

                            const Icon = action.icon;

                            return (

                                <motion.div

                                    key={action.title}

                                    whileHover={{

                                        scale: 1.02,

                                        y: -2,

                                    }}

                                    whileTap={{

                                        scale: .98,

                                    }}

                                >

                                    <Button

                                        variant="outline"

                                        onClick={action.onClick}

                                        className="
                                            flex
                                            h-14
                                            w-full
                                            justify-start
                                            gap-3
                                            rounded-xl
                                            transition-all
                                            hover:shadow-md
                                        "

                                    >

                                        <motion.div

                                            whileHover={{

                                                rotate: 10,

                                                scale: 1.15,

                                            }}

                                        >

                                            <Icon

                                                className={action.color}

                                                size={20}

                                            />

                                        </motion.div>

                                        <span>

                                            {action.title}

                                        </span>

                                    </Button>

                                </motion.div>

                            );

                        })

                    }

                </div>

            </CardContent>

        </Card>

    );

}