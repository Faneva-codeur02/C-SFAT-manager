import { supabase } from "@/lib/supabase";
import { generateInvitationCode } from "@/lib/generateInvitationCode";

export async function createInvitationCode() {
    while (true) {
        const code = generateInvitationCode();

        // Vérifie si le code existe déjà
        const { data, error } = await supabase
            .from("invitation_codes")
            .select("id")
            .eq("code", code)
            .maybeSingle();

        if (error) {
            throw error;
        }

        // Si le code n'existe pas, on l'utilise
        if (!data) {
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 90);

            const { error: insertError } = await supabase
                .from("invitation_codes")
                .insert({
                    code,
                    expires_at: expiresAt.toISOString(),
                });

            if (insertError) {
                throw insertError;
            }

            return code;
        }
    }
}