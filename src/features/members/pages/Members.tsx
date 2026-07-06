import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import MemberTable from "@/features/members/components/MemberTable";
import { useMembers } from "@/features/members/hooks/useMember";
import { useState } from "react";
import MemberFilters from "@/features/members/components/MemberFilters";
import { useMemberFilters } from "../hooks/useMemberFilters";
import { useMemberDialogs } from "../hooks/useMemberDialogs";
import { useMemberActions } from "../hooks/useMemberActions";
import MemberForm from "../components/MemberForm";
import MemberDetailsDialog from "../dialogs/MemberDetailsDialog";
import EditMemberDialog from "../dialogs/EditMemberDialog";
import ConfirmActionDialog from "../dialogs/ConfirmActionDialog";
import { useMemberSelection } from "../hooks/useMemberSelection";
import BulkActionsBar from "../components/BulkActionsBar";
import { useBulkMemberActions } from "../hooks/useBulkMemberActions";

export default function Members() {

    const [open, setOpen] = useState(false);

    const filters =
        useMemberFilters();

    const {
        members,
        loading,
        loadMembers,
    } = useMembers(filters);

    const dialogs =
        useMemberDialogs();

    const actions =
        useMemberActions(
            loadMembers,
            dialogs.closeDialog,
        );

    const selection =
        useMemberSelection();

    const bulk =
        useBulkMemberActions(

            loadMembers,

            selection.clear,

        );

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

                status={filters.status}

                voicePart={filters.voicePart}

                sortBy={filters.sortBy}

                onStatusChange={filters.setStatus}

                onVoicePartChange={filters.setVoicePart}

                onSortChange={filters.handleSort}

            />

            <BulkActionsBar

                count={selection.selectedIds.length}

                onDeactivate={() =>

                    bulk.deactivate(

                        selection.selectedIds

                    )

                }

                onReactivate={() =>

                    bulk.reactivate(

                        selection.selectedIds

                    )

                }

                onArchive={() =>
                    bulk.archive(selection.selectedIds)
                }

                onExport={() => { }}

            />

            {
                loading

                    ? (

                        <p>Chargement...</p>

                    )

                    : (


                        <MemberTable

                            members={members}

                            selectedIds={selection.selectedIds}

                            onToggle={selection.toggle}

                            onToggleAll={() =>

                                selection.toggleAll(

                                    members.map(member => member.id)

                                )

                            }

                            sortBy={filters.sortBy}

                            order={filters.order}

                            onSort={filters.handleSort}

                            onView={dialogs.openView}

                            onEdit={dialogs.openEdit}

                            onDeactivate={dialogs.openToggle}

                            onReactivate={dialogs.openToggle}

                        />

                    )
            }

            <MemberForm

                open={open}

                onOpenChange={setOpen}

            />

            <MemberDetailsDialog

                member={dialogs.selectedMember}

                open={dialogs.dialogType === "view"}

                onClose={dialogs.closeDialog}

            />

            <EditMemberDialog

                member={dialogs.selectedMember}

                open={dialogs.dialogType === "edit"}

                onClose={dialogs.closeDialog}

                onUpdated={loadMembers}

            />

            <ConfirmActionDialog

                open={dialogs.dialogType === "toggle"}

                title={
                    dialogs.selectedMember?.status === "active"

                        ? "Désactiver ce membre ?"

                        : "Réactiver ce membre ?"
                }

                description={
                    dialogs.selectedMember?.status === "active"

                        ? "Le membre ne pourra plus accéder à l'application."

                        : "Le membre retrouvera immédiatement l'accès."
                }

                confirmLabel={
                    dialogs.selectedMember?.status === "active"

                        ? "Désactiver"

                        : "Réactiver"
                }

                confirmVariant={
                    dialogs.selectedMember?.status === "active"

                        ? "destructive"

                        : "default"
                }

                onCancel={dialogs.closeDialog}

                onConfirm={() => {

                    if (!dialogs.selectedMember) return;

                    actions.toggleStatus(
                        dialogs.selectedMember
                    );

                }}

            />

        </AppLayout>
    );
}