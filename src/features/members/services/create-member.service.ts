import { supabase } from "@/shared/lib/supabase";
import type { Profile, ProfileInsert } from "@/types";

export type NewMemberInput = Omit<
    ProfileInsert,
    "id" | "status" | "role" | "member_number" | "created_at" | "updated_at"
> & {
    role?: Profile["role"];
};

async function getNextMemberNumber(): Promise<string> {

    const { data, error } = await supabase
        .from("profiles")
        .select("member_number")
        .not("member_number", "is", null);

    if (error) throw error;

    const max = (data ?? []).reduce((acc, row) => {
        const n = parseInt(row.member_number!.slice(1), 10);
        return Number.isNaN(n) ? acc : Math.max(acc, n);
    }, 0);

    return `M${String(max + 1).padStart(4, "0")}`;
}

export async function createMember(values: NewMemberInput): Promise<Profile> {

    const memberNumber = await getNextMemberNumber();

    const { data, error } = await supabase
        .from("profiles")
        .insert({
            id: crypto.randomUUID(),
            member_number: memberNumber,
            status: "active",
            role: values.role ?? "member",
            ...values,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}