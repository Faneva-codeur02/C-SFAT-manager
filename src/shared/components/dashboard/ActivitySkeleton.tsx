import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ActivitySkeleton() {

    return (

        <div className="flex items-start gap-4 py-4">

            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="flex-1 space-y-2">

                <Skeleton className="h-5 w-40" />

                <Skeleton className="h-4 w-72" />

            </div>

            <Skeleton className="h-4 w-16" />

        </div>

    );

}