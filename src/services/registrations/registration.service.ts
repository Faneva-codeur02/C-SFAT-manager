import { supabase } from "@/lib/supabase";

import type {
    Profile,
    UserRole,
    VoicePart,
} from "@/types";

/**
 * Retourne les membres en attente de validation
 */
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

/**
 * Retourne un membre par son ID
 */
export async function getPendingMemberById(
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

/**
 * Valide un membre
 */
export async function approveMember(
    memberId: string,
    role: UserRole,
    voicePart: VoicePart,
    validatedBy: string,
    dateEntree: string,
) {

    const { error } = await supabase.rpc(
        "approve_member",
        {
            p_member_id: memberId,
            p_role: role,
            p_voice_part: voicePart,
            p_validated_by: validatedBy,
            p_date_entree: dateEntree,
        }
    );

    if (error) {
        throw error;
    }

}

/**
 * Refuse une inscription
 */
export async function rejectMember(
    memberId: string,
) {
    const { error } = await supabase.rpc(
        "reject_member",
        {
            p_member_id: memberId,
        }
    );

    if (error) {
        throw error;
    }
}