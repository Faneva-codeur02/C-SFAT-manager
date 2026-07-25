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

    let total = 0;

    const result = months.map(month => ({

        month,

        members: 0,

    }));

    data?.forEach(member => {

        if (!member.created_at)

            return;

        const month =

            new Date(member.created_at).getMonth();

        total++;

        result[month].members = total;

    });

    return result;

}

export async function getPaymentCategories() {

    const { data, error } = await supabase

        .from("member_contributions")

        .select("status");

    if (error)

        throw error;

    const categories = {

        paid: 0,

        pending: 0,

        partial: 0,

        cancelled: 0,

    };

    data?.forEach(item => {

        categories[item.status]++;

    });

    return [

        {
            name: "Payées",
            value: categories.paid,
        },

        {
            name: "En attente",
            value: categories.pending,
        },

        {
            name: "Partielles",
            value: categories.partial,
        },

        {
            name: "Annulées",
            value: categories.cancelled,
        },

    ];

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