import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function StatCardSkeleton() {

    return (

        <Card>

            <CardContent className="space-y-4 p-6">

                <div className="flex items-center justify-between">

                    <Skeleton className="h-10 w-10 rounded-xl" />

                    <Skeleton className="h-5 w-14" />

                </div>

                <Skeleton className="h-8 w-24" />

                <Skeleton className="h-4 w-36" />

            </CardContent>

        </Card>

    );

}