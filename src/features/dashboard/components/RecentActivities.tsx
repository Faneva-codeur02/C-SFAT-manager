import {

    Card,

    CardContent,

    CardHeader,

    CardTitle,

} from "@/shared/components/ui/card";

import type {

    Activity,

    StatColor,

} from "../types/dashboard.types";

import { cn } from "@/shared/utils/utils";

interface Props {

    activities: Activity[];

}

const colors: Record<

    StatColor,

    string

> = {

    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",

    green: "bg-green-500/10 text-green-600 dark:text-green-400",

    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",

    red: "bg-red-500/10 text-red-600 dark:text-red-400",

    purple: "bg-violet-500/10 text-violet-600 dark:text-violet-400",

};

export default function RecentActivities({

    activities,

}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Activités récentes

                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="space-y-4">

                    {

                        activities.map(activity => {

                            const Icon = activity.icon;

                            return (

                                <div

                                    key={activity.id}

                                    className="flex items-start gap-4"

                                >

                                    <div

                                        className={cn(

                                            "flex h-10 w-10 items-center justify-center rounded-xl",

                                            colors[activity.color]

                                        )}

                                    >

                                        <Icon size={18} />

                                    </div>

                                    <div className="flex-1">

                                        <p className="font-medium">

                                            {activity.title}

                                        </p>

                                        <p className="text-sm text-muted-foreground">

                                            {activity.description}

                                        </p>

                                    </div>

                                    <span className="text-xs text-muted-foreground">

                                        {activity.date}

                                    </span>

                                </div>

                            );

                        })

                    }

                </div>

            </CardContent>

        </Card>

    );

}