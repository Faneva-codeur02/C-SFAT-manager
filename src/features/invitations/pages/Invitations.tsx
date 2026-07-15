import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import { useInvitationCodes } from "@/features/invitations/hooks/useInvitationCodes";
import InvitationTable from "@/features/invitations/components/InvitationTable";
import { createInvitationCode } from "@/features/invitations/services/invitation.service";
import { toast } from "sonner";
import { useInvitationActions } from "../hooks/useInvitationActions";
import type { InvitationWithCreator } from "@/types";
import { useState } from "react";
import ConfirmActionDialog from "@/features/members/dialogs/ConfirmActionDialog";
import { useInvitationFilters } from "../hooks/useInvitationFilters";
import { useDebounce } from "@/features/members/hooks/useDebounce";
import InvitationSearch from "../components/InvitationSearch";

export default function Invitations() {
    const filters =
        useInvitationFilters();

    const debouncedSearch =
        useDebounce(
            filters.search,
            500
        );

    const {
        codes,
        loading,
        reload,
    } = useInvitationCodes({

        search: debouncedSearch,

    });

    async function createInvitation() {
        try {
            const code = await createInvitationCode();

            toast.success("Code créé avec succès.");

            toast.info(code);

            reload();

        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const actions =
        useInvitationActions(reload);

    const [

        selected,

        setSelected,

    ] = useState<
        InvitationWithCreator | null
    >(null);


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
            <div className="mb-6 flex items-center justify-between">

                <InvitationSearch
                    value={filters.search}
                    onChange={filters.setSearch}
                />

            </div>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <InvitationTable

                    codes={codes}

                    onDelete={
                        setSelected
                    }

                />
            )}
            <ConfirmActionDialog

                open={!!selected}

                title="Supprimer ce code ?"

                description="Cette action est irréversible."

                confirmLabel="Supprimer"

                confirmVariant="destructive"

                onCancel={() =>

                    setSelected(null)

                }

                onConfirm={async () => {

                    if (!selected) return;

                    await actions.remove(
                        selected.id
                    );

                    setSelected(null);

                }}

            />

        </AppLayout>
    );
}