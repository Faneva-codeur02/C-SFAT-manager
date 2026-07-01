import { supabase } from "@/lib/supabase";

export async function validateInvitationCode(code: string) {

    const { data, error } = await supabase
        .from("invitation_codes")
        .select("*")
        .eq("code", code.trim().toUpperCase())
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error("Code d'invitation invalide.");
    }

    if (data.used) {
        throw new Error("Ce code a déjà été utilisé.");
    }

    if (new Date(data.expires_at) < new Date()) {
        throw new Error("Ce code est expiré.");
    }

    return data;
}

export async function markInvitationAsUsed(
    invitationId: string,
    profileId: string
) {

    const { error } = await supabase
        .from("invitation_codes")
        .update({

            used: true,

            used_by: profileId,

        })
        .eq("id", invitationId);

    if (error) {
        throw error;
    }

}