import { supabase } from "@/lib/supabase";

import type {
    Profile,
    UserRole,
    VoicePart,
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

export async function approveMember(
    memberId: string,
    role: UserRole,
    voicePart: VoicePart,
    validatedBy: string,
) {

    const { error } = await supabase
        .from("profiles")
        .update({

            status: "active",

            role,

            voice_part: voicePart,

            validated_at: new Date().toISOString(),

            validated_by: validatedBy,

        })
        .eq("id", memberId);

    if (error) {
        throw error;
    }

}

export async function rejectMember(
    memberId: string,
) {

    const { error } = await supabase
        .from("profiles")
        .update({

            status: "rejected",

        })
        .eq("id", memberId);

    if (error) {
        throw error;
    }

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