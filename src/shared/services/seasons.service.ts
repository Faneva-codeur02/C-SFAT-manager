import { supabase } from "@/shared/lib/supabase";

import type { Season } from "@/features/contributions/types/contribution.types";

export async function getSeasons(): Promise<Season[]> {

    const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        throw error;
    }

    return data ?? [];

}