import { supabase } from "@/shared/lib/supabase";

export async function archiveMember(id: string) {

    console.log("Archive appelée pour :", id);

    const { data, error } = await supabase
        .from("profiles")
        .update({
            archived: true,
            deleted_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

    console.log(data);
    console.log(error);

    if (error) throw error;
}

export async function restoreMember(id: string) {

    const { error } = await supabase

        .from("profiles")

        .update({

            archived: false,

            deleted_at: null,

        })

        .eq("id", id);

    if (error) throw error;

}

export async function permanentlyDeleteMember(id: string) {

    const { count, error: checkError } = await supabase

        .from("payments")

        .select("*", { count: "exact", head: true })

        .eq("profile_id", id);

    if (checkError) {

        throw checkError;

    }

    if (count && count > 0) {

        throw new Error(

            "Ce membre a des paiements enregistrés et ne peut pas être supprimé définitivement. " +

            "Laissez-le archivé pour conserver l'historique comptable."

        );

    }

    const { error } = await supabase

        .from("profiles")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        throw error;

    }

}