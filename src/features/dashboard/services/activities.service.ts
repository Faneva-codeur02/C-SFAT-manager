import { supabase } from "@/shared/lib/supabase";

import type {
    Activity,
} from "../types/dashboard.types";

export async function getRecentActivities(): Promise<Activity[]> {

    const activities: Activity[] = [];

    /*
    ===========================
    Nouveaux membres
    ===========================
    */

    const {
        data: members,
        error: membersError,
    } = await supabase

        .from("profiles")

        .select("id, nom, prenom, created_at")

        .order("created_at", {
            ascending: false,
        })

        .limit(5);

    if (membersError)

        throw membersError;

    members?.forEach(member => {

        activities.push({

            id: `member-${member.id}`,

            type: "member",

            title: "Nouveau membre",

            description:

                `${member.prenom} ${member.nom} a rejoint la chorale.`,

            date: member.created_at!,

        });

    });

    /*
    ===========================
    Cotisations
    ===========================
    */

    const {
        data: payments,
        error: paymentsError,
    } = await supabase

        .from("member_contributions")

        .select(`
            id,
            amount_paid,
            paid_at,
            profiles (
                nom,
                prenom
            )
        `)

        .eq("status", "paid")

        .order("paid_at", {
            ascending: false,
        })

        .limit(5);

    if (paymentsError)

        throw paymentsError;

    payments?.forEach(payment => {

        const profile = Array.isArray(payment.profiles)
            ? payment.profiles[0]
            : payment.profiles;

        activities.push({

            id: `payment-${payment.id}`,

            type: "payment",

            title: "Cotisation enregistrée",

            description:

                `${payment.amount_paid} Ar reçus de ${profile?.prenom ?? ""} ${profile?.nom ?? ""}`,

            date: payment.paid_at!,

        });

    });

    /*
    ===========================
    Invitations
    ===========================
    */

    const {
        data: invitations,
        error: invitationError,
    } = await supabase

        .from("invitation_codes")

        .select("id, code, created_at")

        .order("created_at", {
            ascending: false,
        })

        .limit(5);

    if (invitationError)

        throw invitationError;

    invitations?.forEach(invitation => {

        activities.push({

            id: `invitation-${invitation.id}`,

            type: "invitation",

            title: "Invitation créée",

            description:

                `Code ${invitation.code} généré.`,

            date: invitation.created_at!,

        });

    });

    /*
    ===========================
    Tri chronologique
    ===========================
    */

    activities.sort(

        (a, b) =>

            new Date(b.date).getTime()

            -

            new Date(a.date).getTime()

    );

    return activities.slice(0, 10);

}