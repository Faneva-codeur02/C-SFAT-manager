import { supabase } from "@/shared/lib/supabase";

export async function deactivateMember(
    memberId: string,
) {

    const { error } = await supabase
        .from("profiles")
        .update({

            status: "inactive",

            updated_at: new Date().toISOString(),

        })
        .eq("id", memberId);

    if (error) {

        throw error;

    }

}

export async function reactivateMember(
    memberId: string,
) {

    const { error } = await supabase
        .from("profiles")
        .update({

            status: "active",

            updated_at: new Date().toISOString(),

        })
        .eq("id", memberId);

    if (error) {

        throw error;

    }

}