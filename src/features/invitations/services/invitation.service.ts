import { supabase } from "@/shared/lib/supabase";
import { generateInvitationCode } from "@/shared/lib/generateInvitationCode";

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

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                throw new Error("Utilisateur non connecté.");
            }

            const { error: insertError } = await supabase
                .from("invitation_codes")
                .insert({
                    code,
                    expires_at: expiresAt.toISOString(),
                    created_by: user.id,
                });

            if (insertError) {
                throw insertError;
            }

            return code;
        }
    }
}

export async function deleteInvitationCode(
    id: string,
) {

    const { error } =
        await supabase

            .from("invitation_codes")

            .delete()

            .eq("id", id);

    if (error) throw error;

}