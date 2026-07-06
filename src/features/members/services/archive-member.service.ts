import { supabase } from "@/shared/lib/supabase";

export async function archiveMember(id: string) {

    const { error } = await supabase
        .from("profiles")
        .update({
            archived: true,
        })
        .eq("id", id);

    if (error) throw error;

}

export async function restoreMember(id: string) {

    const { error } = await supabase
        .from("profiles")
        .update({
            archived: false,
        })
        .eq("id", id);

    if (error) throw error;

}