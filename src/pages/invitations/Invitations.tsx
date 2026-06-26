import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { generateInvitationCode } from "@/lib/generateInvitationCode";
import { supabase } from "@/lib/supabase";

export default function Invitations() {
    async function createInvitation() {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 90);

        const code = generateInvitationCode();

        const { error } = await supabase
            .from("invitation_codes")
            .insert({
                code,
                expires_at: expiresAt.toISOString(),
            })

        if (error) {
            alert(error.message);
            return;
        }

        alert("Code créé !");
    }

    return (
        <AppLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">
                    Codes d'invitation
                </h1>

                <Button onClick={createInvitation}>
                    Générer un code
                </Button>
            </div>
        </AppLayout>
    );
}