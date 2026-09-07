import { getCategoryReport } from "@/features/reports/services/reports.service";
import { supabase } from "@/shared/lib/supabase";

export async function getMonthlyContributions() {

    const { data, error } = await supabase

        .from("member_contributions")

        .select(`
            amount_paid,
            paid_at
        `)

        .eq("status", "paid")

        .order("paid_at");

    if (error)

        throw error;

    const months = [

        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
        "Août",
        "Sep",
        "Oct",
        "Nov",
        "Déc",

    ];

    const result = months.map(month => ({

        month,

        amount: 0,

    }));

    data?.forEach(item => {

        if (!item.paid_at)

            return;

        const month =

            new Date(item.paid_at).getMonth();

        result[month].amount +=

            Number(item.amount_paid);

    });

    return result;

}

export async function getMemberEvolution() {

    const { data, error } = await supabase

        .from("profiles")

        .select("created_at")

        .order("created_at");

    if (error)

        throw error;

    const months = [

        "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
        "Juil", "Août", "Sep", "Oct", "Nov", "Déc",

    ];

    const newMembersByMonth = new Array(12).fill(0);

    data?.forEach(member => {

        if (!member.created_at) return;

        const month = new Date(member.created_at).getMonth();

        newMembersByMonth[month]++;

    });

    let cumulative = 0;

    return months.map((month, index) => {

        cumulative += newMembersByMonth[index];

        return { month, members: cumulative };

    });

}

export async function getPaymentCategories() {

    const { data: currentSeason, error: seasonError } = await supabase
        .from("seasons")
        .select("id")
        .eq("is_current", true)
        .limit(1)
        .maybeSingle();

    if (seasonError) throw seasonError;

    if (!currentSeason) return [];

    const rows = await getCategoryReport(currentSeason.id);

    return rows

        .filter((row) => row.categoryType === "income")

        .map((row) => ({

            name: row.categoryName,

            value: row.total,

        }));

}

export async function getDashboardCharts() {

    const [

        monthlyContributions,

        memberEvolution,

        paymentCategories,

    ] = await Promise.all([

        getMonthlyContributions(),

        getMemberEvolution(),

        getPaymentCategories(),

    ]);

    return {

        monthlyContributions,

        memberEvolution,

        paymentCategories,

    };

}