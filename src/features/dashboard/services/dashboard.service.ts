import { getDashboardStats } from "./stats.service";
import { getRecentActivities } from "./activities.service";
import { getDashboardCharts } from "./charts.service";

export async function getDashboardData() {

    const [

        stats,

        charts,

        recentActivities,

    ] = await Promise.all([

        getDashboardStats(),

        getDashboardCharts(),

        getRecentActivities(),

    ]);

    return {

        stats,

        recentActivities,

        ...charts,

    };
}