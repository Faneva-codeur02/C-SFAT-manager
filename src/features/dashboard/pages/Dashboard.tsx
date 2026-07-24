import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import DashboardCharts from "../components/DashboardCharts";
import QuickActions from "../components/QuickActions";
import RecentActivities from "../components/RecentActivities";

import DashboardSkeleton from "@/shared/components/dashboard/DashboardSkeleton";

import { useDashboard } from "../hooks/useDashboard";
import AppLayout from "@/app/layouts/AppLayout";
import DashboardEmpty from "../components/DashboardEmpty";
import DashboardError from "../components/DashboardError";

export default function Dashboard() {

    const {

        data,

        loading,

        error,

        refresh

    } = useDashboard();

    if (loading) {

        return <DashboardSkeleton />;

    }

    if (error) {

        return (

            <DashboardError

                message={error}

                onRetry={refresh}

            />

        );

    }

    if (!data) {

        return (

            <DashboardEmpty

                onRefresh={refresh}

            />

        );

    }

    return (
        <AppLayout>
            <div className="space-y-8">

                <DashboardHeader />

                <DashboardStats

                    stats={data.stats}

                />

                <DashboardCharts

                    data={data}

                />

                <QuickActions />

                <RecentActivities

                    activities={data.recentActivities}

                />

            </div>
        </AppLayout>

    );

}