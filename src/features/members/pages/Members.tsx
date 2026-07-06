import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import MemberTable from "@/features/members/components/MemberTable";
import { useMembers } from "@/features/members/hooks/useMember";
import MemberForm from "@/features/members/components/MemberForm";
import { useState } from "react";
import { useSearch } from "@/shared/context/SearchContext";
import type { Profile } from "@/types";
import MemberDetailsDialog from "../dialogs/MemberDetailsDialog";
import EditMemberDialog from "@/features/members/dialogs/EditMemberDialog"
import { toast } from "sonner";
import { deactivateMember, reactivateMember } from "../services/deactivate-member.service";
import ConfirmActionDialog from "../dialogs/ConfirmActionDialog";
import type {
    MemberStatus,
    VoicePart,
} from "@/types";
import MemberFilters from "@/features/members/components/MemberFilters";
import type { MemberSort } from "../types/member-filter";

export default function Members() {

    const [open, setOpen] = useState(false);

    const { search } = useSearch();

    const [status, setStatus] =
        useState<MemberStatus | undefined>();

    const [voicePart, setVoicePart] =
        useState<VoicePart | undefined>();

    const [sortBy, setSortBy] =
        useState<MemberSort>("name");

    const {
        members,
        loading,
        loadMembers,
    } = useMembers({

        search,
        status,
        voicePart,
        sortBy,
        order: "asc",

    });


    const [selectedMember, setSelectedMember] =
        useState<Profile | null>(null);

    const [dialogType, setDialogType] =
        useState<
            "view" |
            "edit" |
            "toggle" |
            null
        >(null);

    function handleView(member: Profile) {

        setSelectedMember(member);

        setDialogType("view");

    }

    function handleEdit(member: Profile) {

        setSelectedMember(member);

        setDialogType("edit");

    }

    function handleDeactivate(member: Profile) {

        setSelectedMember(member);

        setDialogType("toggle");

    }

    function handleReactivate(member: Profile) {

        setSelectedMember(member);

        setDialogType("toggle");

    }
    async function confirmToggleStatus() {

        if (!selectedMember) return;

        try {

            if (
                selectedMember.status === "active"
            ) {

                await deactivateMember(
                    selectedMember.id
                );

                toast.success(
                    "Membre désactivé."
                );

            } else {

                await reactivateMember(
                    selectedMember.id
                );

                toast.success(
                    "Membre réactivé."
                );

            }

            await loadMembers();

        } finally {

            setDialogType(null);

            setSelectedMember(null);

        }

    }
    return (

        <AppLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">
                    Gestion des membres
                </h1>

                <Button
                    onClick={() => setOpen(true)}
                >
                    Ajouter un membre
                </Button>
            </div>

            <MemberFilters

                status={status}

                voicePart={voicePart}

                sortBy={sortBy}

                onStatusChange={setStatus}

                onVoicePartChange={setVoicePart}

                onSortChange={setSortBy}

            />

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <MemberTable
                    members={members}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDeactivate={handleDeactivate}
                    onReactivate={handleReactivate}
                />
            )}

            <MemberForm
                open={open}
                onOpenChange={setOpen}
            />
            <MemberDetailsDialog
                member={selectedMember}
                open={dialogType === "view"}
                onClose={() => {

                    setDialogType(null);

                    setSelectedMember(null);

                }}
            />

            <EditMemberDialog

                member={selectedMember}

                open={dialogType === "edit"}

                onClose={() => {

                    setDialogType(null);

                    setSelectedMember(null);

                }}

                onUpdated={loadMembers}

            />

            <ConfirmActionDialog

                open={dialogType === "toggle"}

                title={
                    selectedMember?.status === "active"

                        ? "Désactiver ce membre ?"

                        : "Réactiver ce membre ?"
                }

                description={
                    selectedMember?.status === "active"

                        ? "Le membre ne pourra plus accéder à l'application."

                        : "Le membre retrouvera immédiatement l'accès."
                }

                confirmLabel={
                    selectedMember?.status === "active"

                        ? "Désactiver"

                        : "Réactiver"
                }

                confirmVariant={
                    selectedMember?.status === "active"

                        ? "destructive"

                        : "default"
                }

                onCancel={() => {

                    setDialogType(null);

                    setSelectedMember(null);

                }}

                onConfirm={confirmToggleStatus}

            />
        </AppLayout>
    );
}