import AppLayout from "@/app/layouts/AppLayout";
import { useArchivedMembers } from "@/features/members/hooks/useArchivedMembers";
import ArchivedMemberTable from "../components/ArchivedMemberTable";
import type { Profile } from "@/types";
import { toast } from "sonner";

import {

    restoreMember,

    permanentlyDeleteMember,

} from "../services/archive-member.service";
import { useState } from "react";
import ConfirmActionDialog from "../dialogs/ConfirmActionDialog";

export default function ArchivedMembers() {

    const {
        members,
        loading,
        loadMembers,
    } = useArchivedMembers();

    async function handleRestore(member: Profile) {

        try {

            await restoreMember(member.id);

            toast.success(

                "Le membre a été restauré."

            );

            loadMembers();

        }

        catch {

            toast.error(

                "Impossible de restaurer."

            );

        }

    }

    async function handleDelete(member: Profile) {

        try {

            await permanentlyDeleteMember(member.id);

            toast.success(

                "Le membre a été supprimé définitivement."

            );

            loadMembers();

        }

        catch {

            toast.error(

                "Suppression impossible."

            );

        }

    }

    const [

        memberToDelete,

        setMemberToDelete,

    ] = useState<Profile | null>(null);

    return (

        <AppLayout>

            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    Membres archivés

                </h1>

                <p className="text-muted-foreground">

                    Les membres archivés peuvent être restaurés.

                </p>

            </div>

            {

                loading

                    ? <p>Chargement...</p>

                    : (

                        <ArchivedMemberTable

                            members={members}

                            onRestore={handleRestore}

                            onDelete={(member) =>

                                setMemberToDelete(member)

                            }

                        />

                    )

            }
            <ConfirmActionDialog

                open={!!memberToDelete}

                title="Supprimer définitivement ?"

                description="Cette action est irréversible."

                confirmLabel="Supprimer"

                confirmVariant="destructive"

                onCancel={() =>

                    setMemberToDelete(null)

                }

                onConfirm={async () => {

                    if (!memberToDelete) return;

                    await handleDelete(memberToDelete);

                    setMemberToDelete(null);

                }}

            />

        </AppLayout>

    );

}