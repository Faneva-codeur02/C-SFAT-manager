import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { generateInvitationCode } from "@/lib/generateInvitationCode";
import { supabase } from "@/lib/supabase";
import { useInvitationCodes } from "@/hooks/useInvitationCodes";
import InvitationTable from "@/components/invitations/InvitationTable";

export default function Invitations() {
    const {
        codes,
        loading,
        reload,
    } = useInvitationCodes();

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

        await reload();
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
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <InvitationTable
                    codes={codes}
                />
            )}
        </AppLayout>
    );
}