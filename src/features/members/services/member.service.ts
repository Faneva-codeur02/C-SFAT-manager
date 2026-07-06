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
    filters?: MemberFilters,
) {

    let query = supabase
        .from("profiles")
        .select("*");

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

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    let members = data ?? [];

    if (filters?.search) {

        const search = filters.search.toLowerCase();

        members = members.filter((member) => {

            const value =
                `${member.nom} ${member.prenom} ${member.voice_part}`
                    .toLowerCase();

            return value.includes(search);

        });

    }

    return members;
}