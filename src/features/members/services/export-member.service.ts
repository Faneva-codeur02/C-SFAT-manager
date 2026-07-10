import { supabase } from "@/shared/lib/supabase";

import type {
    MemberFilters,
    MemberSort,
} from "../types/member-filter";



export async function getAllMembersForExport(

    filters: MemberFilters,

) {


    let query =
        supabase
            .from("profiles")
            .select("*")
            .eq(
                "archived",
                false
            );



    // filtre statut

    if (filters.status) {

        query =
            query.eq(
                "status",
                filters.status
            );

    }



    // filtre pupitre

    if (filters.voicePart) {

        query =
            query.eq(
                "voice_part",
                filters.voicePart
            );

    }



    // recherche

    if (filters.search) {

        const search =
            filters.search
                .trim();


        query =
            query.or(
                `
                nom.ilike.%${search}%,
                prenom.ilike.%${search}%,
                email.ilike.%${search}%
                `
            );

    }



    // tri

    const sortMap: Record<MemberSort, string> = {

        name: "nom",

        firstname: "prenom",

        registrationDate: "created_at",

        voicePart: "voice_part",

    };


    const sortColumn =
        sortMap[filters.sortBy];



    query =
        query.order(
            sortColumn,
            {
                ascending:
                    filters.order === "asc",
            }
        );



    const {
        data,
        error,

    } = await query;



    if (error)
        throw error;



    return data ?? [];

}