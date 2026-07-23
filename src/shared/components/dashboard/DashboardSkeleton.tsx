import StatCardSkeleton from "./StatCardSkeleton";
import ChartSkeleton from "./ChartSkeleton";
import ActivitySkeleton from "./ActivitySkeleton";
import QuickActionsSkeleton from "./QuickActionsSkeleton";

export default function DashboardSkeleton() {

    return (

        <div className="space-y-8">

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {

                    Array.from({ length: 4 }).map((_, index) => (

                        <StatCardSkeleton key={index} />

                    ))

                }

            </div>

            <div className="grid gap-6 xl:grid-cols-4">

                <div className="xl:col-span-3">

                    <ChartSkeleton />

                </div>

                <QuickActionsSkeleton />

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                <ChartSkeleton />

                <ChartSkeleton />

            </div>

            <div className="space-y-4">

                {

                    Array.from({ length: 4 }).map((_, index) => (

                        <ActivitySkeleton key={index} />

                    ))

                }

            </div>

        </div>

    );

}