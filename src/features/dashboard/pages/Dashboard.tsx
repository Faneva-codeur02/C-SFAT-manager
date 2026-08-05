import DashboardHeader from "../components/DashboardHeader";
import DashboardCharts from "../components/DashboardCharts";
import QuickActions from "../components/QuickActions";
import RecentActivities from "../components/RecentActivities";

import DashboardSkeleton from "@/shared/components/dashboard/DashboardSkeleton";

import { useDashboard } from "../hooks/useDashboard";
import AppLayout from "@/app/layouts/AppLayout";
import DashboardEmpty from "../components/DashboardEmpty";
import DashboardError from "../components/DashboardError";
import { StatsGrid } from "@/shared/components/stats";

export default function Dashboard() {

    const {

        data,

        loading,

        error,

        refresh,

    } = useDashboard();

    return (

        <AppLayout>

            <div className="space-y-8">

                <DashboardHeader />

                {

                    loading ? (

                        <DashboardSkeleton />

                    ) : error ? (

                        <DashboardError

                            message={error}

                            onRetry={refresh}

                        />

                    ) : !data ? (

                        <DashboardEmpty

                            onRefresh={refresh}

                        />

                    ) : (

                        <>

                            <StatsGrid

                                stats={data.stats}

                            />

                            <DashboardCharts

                                data={data}

                            />

                            <QuickActions />

                            <RecentActivities

                                activities={data.recentActivities}

                            />

                        </>

                    )

                }

            </div>

        </AppLayout>

    );

}