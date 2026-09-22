import { Skeleton } from "@/shared/components/ui/skeleton";

export default function MyProfileSkeleton() {

    return (

        <div className="max-w-lg space-y-6">

            <div className="flex items-center gap-4">

                <Skeleton className="h-16 w-16 rounded-full" />

                <div className="space-y-2">

                    <Skeleton className="h-4 w-40" />

                    <Skeleton className="h-3 w-20" />

                </div>

            </div>

            <div className="space-y-4">

                <div className="space-y-2">

                    <Skeleton className="h-4 w-16" />

                    <Skeleton className="h-9 w-full" />

                </div>

                <div className="space-y-2">

                    <Skeleton className="h-4 w-16" />

                    <Skeleton className="h-9 w-full" />

                </div>

                <div className="space-y-2">

                    <Skeleton className="h-4 w-20" />

                    <Skeleton className="h-9 w-full" />

                </div>

                <Skeleton className="h-9 w-28" />

            </div>

        </div>

    );

}