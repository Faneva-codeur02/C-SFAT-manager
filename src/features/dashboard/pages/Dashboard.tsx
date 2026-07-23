import AppLayout from "@/app/layouts/AppLayout";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import QuickActions from "../components/QuickActions";
import RecentActivities from "../components/RecentActivities";
import DashboardCharts from "../components/DashboardCharts";

export default function Dashboard() {

    return (
        <AppLayout>
            <div className="space-y-8">

                <DashboardHeader />

                <StatsCards />

                <div
                    className="
                    grid
                    gap-6
                    xl:grid-cols-4
                "
                >

                    <div className="xl:col-span-3">

                        <DashboardCharts />

                    </div>

                    <QuickActions />

                </div>

                <RecentActivities />

            </div>
        </AppLayout>
    );
}