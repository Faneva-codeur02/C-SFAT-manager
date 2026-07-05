import { supabase } from "@/shared/lib/supabase";

export async function validateInvitationCode(code: string) {

    const { data, error } = await supabase.rpc(
        "validate_invitation_code",
        {
            p_code: code,
        }
    );

    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        throw new Error(
            "Code d'invitation invalide, expiré ou déjà utilisé."
        );
    }

    return data[0];
}

export async function markInvitationAsUsed(
    invitationId: string,
    profileId: string,
) {

    const { error } = await supabase.rpc(
        "consume_invitation_code",
        {
            p_invitation_id: invitationId,
            p_used_by: profileId,
        }
    );

    if (error) {
        throw error;
    }

}