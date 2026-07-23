import {
    UserPlus,
    Wallet,
    CalendarPlus,
    Mail,
} from "lucide-react";

import ActivityItem from "./ActivityItem";

const activities = [

    {

        icon: UserPlus,

        title: "Nouveau membre",

        description: "Jean Rakoto a rejoint la chorale.",

        time: "Aujourd'hui",

        color: "hsl(var(--chart-2))",

    },

    {

        icon: Wallet,

        title: "Cotisation enregistrée",

        description: "15 000 Ar reçus de Marie.",

        time: "11:24",

        color: "hsl(var(--chart-1))",

    },

    {

        icon: CalendarPlus,

        title: "Nouvel événement",

        description: "Concert de Noël ajouté.",

        time: "Hier",

        color: "hsl(var(--chart-3))",

    },

    {

        icon: Mail,

        title: "Invitation envoyée",

        description: "Invitation envoyée à 5 nouveaux membres.",

        time: "Hier",

        color: "hsl(var(--chart-4))",

    },

];

export default function RecentActivities() {

    return (

        <section
            className="
                rounded-2xl
                border
                bg-card
                p-6
                shadow-sm
            "
        >

            <div className="mb-5">

                <h2 className="text-lg font-semibold">

                    Activités récentes

                </h2>

                <p className="text-sm text-muted-foreground">

                    Les dernières actions effectuées.

                </p>

            </div>

            <div className="space-y-2">

                {

                    activities.map(activity => (

                        <ActivityItem

                            key={

                                activity.title +

                                activity.time

                            }

                            {...activity}

                        />

                    ))

                }

            </div>

        </section>

    );

}