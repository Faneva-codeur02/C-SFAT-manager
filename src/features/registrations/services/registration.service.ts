import { supabase } from "@/shared/lib/supabase";

import type {
    Profile,
    UserRole,
    VoicePart,
} from "@/types";

/**
 * Liste des inscriptions en attente
 */
export async function getPendingMembers(): Promise<Profile[]> {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("status", "pending")
        .order("created_at", {
            ascending: true,
        });

    console.log("data :", data);
    console.log("error :", error);

    if (error) {
        throw error;
    }

    return data ?? [];
}

/**
 * Valider une inscription
 */
export async function approveMember(
    memberId: string,
    role: UserRole,
    voicePart: VoicePart,
    validatedBy: string,
    dateEntree: string,
): Promise<void> {

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
 * Refuser une inscription
 */
export async function rejectMember(
    memberId: string,
    validatedBy: string,
): Promise<void> {

    const { error } = await supabase.rpc(
        "reject_member",
        {
            p_member_id: memberId,
            p_validated_by: validatedBy,
        }
    );

    if (error) {
        throw error;
    }

}
/**
 * Détail d'une inscription
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