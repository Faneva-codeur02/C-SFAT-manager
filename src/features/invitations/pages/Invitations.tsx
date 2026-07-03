import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import { useInvitationCodes } from "@/features/invitations/hooks/useInvitationCodes";
import InvitationTable from "@/features/invitations/components/InvitationTable";
import { createInvitationCode } from "@/features/invitations/services/invitation.service";

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