import { supabase } from "@/shared/lib/supabase";

export async function setMemberContributionStart(
    memberId: string,
    startDate: string, // format YYYY-MM-DD
): Promise<number> {

    const { data, error } = await supabase.rpc("set_member_contribution_start", {
        p_member_id: memberId,
        p_start_date: startDate,
    });

    if (error) throw error;

    return data ?? 0; // nombre de mois supprimés
}