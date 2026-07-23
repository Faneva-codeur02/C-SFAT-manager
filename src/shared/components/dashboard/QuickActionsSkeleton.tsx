import { Skeleton } from "@/shared/components/ui/skeleton";

export default function QuickActionsSkeleton() {

    return (

        <div className="space-y-4">

            {

                Array.from({ length: 4 }).map((_, index) => (

                    <Skeleton

                        key={index}

                        className="h-16 w-full rounded-xl"

                    />

                ))

            }

        </div>

    );

}