import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useInvitationCodes } from "@/hooks/useInvitationCodes";
import InvitationTable from "@/components/invitations/InvitationTable";
import { createInvitationCode } from "@/services/invitations/invitation.service";

export default function Invitations() {
    const {
        codes,
        loading,
        reload,
    } = useInvitationCodes();

    async function createInvitation() {
        try {
            const code = await createInvitationCode();

            alert(`Code créé : ${code}`);

            reload();

        } catch (error: any) {
            alert(error.message);
        }
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