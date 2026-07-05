import { supabase } from "@/shared/lib/supabase";

import type {
    Profile
} from "@/types";

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

export async function getMembers(): Promise<Profile[]> {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("nom", {
            ascending: true,
        });

    if (error) {
        throw error;
    }

    return data ?? [];

}