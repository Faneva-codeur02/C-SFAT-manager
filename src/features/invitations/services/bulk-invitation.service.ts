import { supabase } from "@/shared/lib/supabase";
import type { InvitationWithCreator } from "@/types";

export async function getInvitationsByIds(
    ids: string[],
): Promise<InvitationWithCreator[]> {

    if (ids.length === 0) {

        return [];

    }

    const { data, error } = await supabase

        .from("invitation_codes")

        .select(`
            id,
            code,
            used,
            used_by,
            expires_at,
            created_at,
            created_by,
            creator:profiles!invitation_codes_created_by_fkey(
                id,
                nom,
                prenom
            )
        `)

        .in("id", ids);

    if (error) {

        throw error;

    }

    return (data ?? []) as InvitationWithCreator[];

}

export async function getInvitationCodesByIds(
    ids: string[],
): Promise<string[]> {

    const invitations = await getInvitationsByIds(ids);

    return invitations.map(invitation => invitation.code);

}

export async function deleteInvitationsByIds(
    ids: string[],
): Promise<void> {

    if (ids.length === 0) {

        return;

    }

    const { error } = await supabase

        .from("invitation_codes")

        .delete()

        .in("id", ids);

    if (error) {

        throw error;

    }

}