import { motion } from "framer-motion";

import {
    UserPlus,
    Wallet,
    CalendarPlus,
    FileText,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";

const activities = [

    {
        title: "Cotisation enregistrée",
        description: "Jean Rakoto a payé sa cotisation.",
        date: "Il y a 5 min",
        icon: Wallet,
        color: "bg-green-500",
    },

    {
        title: "Nouveau membre",
        description: "Marie Randria a rejoint la chorale.",
        date: "Aujourd'hui",
        icon: UserPlus,
        color: "bg-blue-500",
    },

    {
        title: "Nouvel évènement",
        description: "Concert de Noël ajouté.",
        date: "Hier",
        icon: CalendarPlus,
        color: "bg-orange-500",
    },

    {
        title: "Rapport généré",
        description: "Rapport mensuel téléchargé.",
        date: "Hier",
        icon: FileText,
        color: "bg-violet-500",
    },

];

export default function RecentActivities() {

    return (

        <Card className="h-full">

            <CardHeader>

                <CardTitle>

                    Activités récentes

                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="space-y-5">

                    {

                        activities.map((activity, index) => {

                            const Icon = activity.icon;

                            return (

                                <motion.div

                                    key={activity.title}

                                    initial={{
                                        opacity: 0,
                                        x: -20,
                                    }}

                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}

                                    transition={{
                                        delay: index * .08,
                                    }}

                                    whileHover={{
                                        x: 6,
                                    }}

                                    className="
                                        flex
                                        items-start
                                        gap-4
                                    "

                                >

                                    <div

                                        className={`
                                            mt-1
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            text-white
                                            ${activity.color}
                                        `}

                                    >

                                        <Icon size={18} />

                                    </div>

                                    <div className="flex-1">

                                        <p className="font-medium">

                                            {activity.title}

                                        </p>

                                        <p
                                            className="
                                                text-sm
                                                text-muted-foreground
                                            "
                                        >

                                            {activity.description}

                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >

                                            {activity.date}

                                        </p>

                                    </div>

                                </motion.div>

                            );

                        })

                    }

                </div>

            </CardContent>

        </Card>

    );

}