import { Skeleton } from "@/shared/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export default function SettingsSkeleton() {

    return (

        <div className="flex gap-8">

            <div className="max-w-lg flex-1 space-y-4">

                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-48" />
                </div>

                <Skeleton className="h-9 w-28" />

            </div>

            <div className="w-72">

                <Card>

                    <CardHeader>

                        <Skeleton className="h-4 w-40" />

                    </CardHeader>

                    <CardContent>

                        <Skeleton className="h-32 w-full rounded-md" />

                        <Skeleton className="mt-3 h-3 w-full" />

                    </CardContent>

                </Card>

            </div>

        </div>

    );

}