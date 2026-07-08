import { supabase } from "@/shared/lib/supabase";

import type {
    Profile
} from "@/types";
import type { MemberFilters } from "../types/member-filter";

export async function getPendingMembers(): Promise<Profile[]> {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("status", "pending")
        .order("created_at", {
            ascending: true,
        });

    if (error) {
        throw error;
    }

    return data ?? [];

}

export async function getMemberById(
    id: string,
): Promise<Profile | null> {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function getMembers(
    filters: MemberFilters,
) {
    let query = supabase
        .from("profiles")
        .select("*", {
            count: "exact",
        })
        .eq("archived", false);

    if (filters.search) {

        const search =
            filters.search.trim();

        query = query.or(
            `nom.ilike.%${search}%,prenom.ilike.%${search}%,email.ilike.%${search}%`
        );

    }

    if (filters?.status) {
        query = query.eq("status", filters.status);
    }

    if (filters?.voicePart) {
        query = query.eq("voice_part", filters.voicePart);
    }

    const sortColumn = {

        name: "nom",

        firstname: "prenom",

        registrationDate: "created_at",

    }[filters?.sortBy ?? "name"];

    query = query.order(
        sortColumn,
        {
            ascending: filters?.order !== "desc",
        },
    );

    query = query.range(

        filters.page * filters.pageSize,

        (filters.page * filters.pageSize)
        + filters.pageSize
        - 1

    );

    const {
        data,
        error,
        count,
    } = await query;

    if (error) {
        throw error;
    }

    return {

        members: data ?? [],

        total: count ?? 0,

    };
}

export async function getArchivedMembers() {

    const { data, error } = await supabase

        .from("profiles")

        .select("*")

        .eq("archived", true)

        .order("nom");

    if (error) throw error;

    return data ?? [];

}