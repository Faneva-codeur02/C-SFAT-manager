import { supabase } from "@/shared/lib/supabase";

export async function bulkDeactivate(ids: string[]) {

    const { error } = await supabase
        .from("profiles")
        .update({
            status: "inactive",
        })
        .in("id", ids);

    if (error) throw error;

}

export async function bulkReactivate(ids: string[]) {

    const { error } = await supabase
        .from("profiles")
        .update({
            status: "active",
        })
        .in("id", ids);

    if (error) throw error;

}

export async function bulkArchive(ids: string[]) {

    const { error } = await supabase
        .from("profiles")
        .update({
            archived: true,
        })
        .in("id", ids);

    if (error) throw error;

}

export async function restoreMembers(
    ids: string[],
) {

    const { error } = await supabase
        .from("profiles")
        .update({
            archived: false,
        })
        .in("id", ids);

    if (error) throw error;

}

export async function restoreMember(
    id: string,
) {

    const { error } = await supabase
        .from("profiles")
        .update({
            archived: false,
        })
        .eq("id", id);

    if (error) throw error;

}