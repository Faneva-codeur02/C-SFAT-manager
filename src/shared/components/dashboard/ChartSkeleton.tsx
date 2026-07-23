import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ChartSkeleton() {

    return (

        <Card>

            <CardHeader className="space-y-2">

                <Skeleton className="h-6 w-48" />

                <Skeleton className="h-4 w-32" />

            </CardHeader>

            <CardContent>

                <Skeleton className="h-[320px] w-full rounded-xl" />

            </CardContent>

        </Card>

    );

}