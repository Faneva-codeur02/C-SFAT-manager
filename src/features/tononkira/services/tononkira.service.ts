import { supabase } from "@/shared/lib/supabase";

import type { Tononkira } from "../types/tononkira.types";
import type { TononkiraFilters, TononkiraPagination } from "../types/tononkira-filter";

export async function getTononkiraList(
    filters: TononkiraFilters,
    pagination: TononkiraPagination,
) {

    let query = supabase
        .from("tononkira")
        .select("*", { count: "exact" });

    if (filters.search) {

        query = query.ilike("title", `%${filters.search.trim()}%`);

    }

    query = query

        .order("title", { ascending: true })

        .range(

            pagination.page * pagination.pageSize,

            pagination.page * pagination.pageSize + pagination.pageSize - 1,

        );

    const { data, error, count } = await query;

    if (error) {
        throw error;
    }

    return {

        songs: data ?? [],

        total: count ?? 0,

    };

}

export async function getTononkiraById(id: string): Promise<Tononkira | null> {

    const { data, error } = await supabase
        .from("tononkira")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;

}

export async function getAudioSignedUrl(

    path: string,

    expiresIn = 3600,

): Promise<string | null> {

    const { data, error } = await supabase.storage

        .from("tononkira-audio")

        .createSignedUrl(path, expiresIn);

    if (error) {

        return null;

    }

    return data.signedUrl;

}