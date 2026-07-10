import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import MemberTable from "@/features/members/components/MemberTable";
import { useMembers } from "@/features/members/hooks/useMember";
import { useEffect, useState } from "react";
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
import { usePagination } from "../hooks/usePagination";
import MemberPagination from "../components/MemberPagination";
import { useSearch } from "@/shared/context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";
import ColumnVisibility from "../components/ColumnVisibility";
import { useMemberColumns } from "../hooks/useMemberColumns";
import ExportMembersButton from "../components/ExportMembersButton";
import ExportCSVButton from "../components/ExportCSVButton";
import ExportSelectedCSVButton
    from "../components/ExportSelectedCSVButton";
import ExportSelectedPDFButton
    from "../components/ExportSelectedPDFButton";

export default function Members() {

    const [open, setOpen] = useState(false);

    const filters =
        useMemberFilters();


    const { search } = useSearch();

    const debouncedSearch =
        useDebounce(search, 500);


    const pagination = usePagination();

    const {
        members,
        total,
        loading,
        loadMembers,
    } = useMembers(
        filters,
        pagination
    );

    const columns =
        useMemberColumns();

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

    const selectedMembers =
        members.filter(
            member =>
                selection.selectedIds.includes(member.id)
        );

    useEffect(() => {

        pagination.setPage(0);

    }, [
        debouncedSearch,
        filters.status,
        filters.voicePart,
        filters.sortBy,
    ]);



    return (

        <AppLayout>
            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Gestion des membres
                </h1>

                <div className="flex gap-3">


                    <ColumnVisibility

                        visibleColumns={
                            columns.visibleColumns
                        }

                        toggleColumn={
                            columns.toggleColumn
                        }

                    />



                    <ExportMembersButton

                        members={members}

                        visibleColumns={
                            columns.visibleColumns
                        }

                    />



                    <ExportCSVButton

                        filters={filters}

                        visibleColumns={
                            columns.visibleColumns
                        }

                    />

                    <ExportSelectedCSVButton

                        selectedIds={
                            selection.selectedIds
                        }

                        visibleColumns={
                            columns.visibleColumns
                        }

                    />

                    <ExportSelectedPDFButton

                        members={selectedMembers}

                        visibleColumns={
                            columns.visibleColumns
                        }

                    />


                    <Button
                        onClick={() => setOpen(true)}
                    >

                        Ajouter un membre

                    </Button>


                </div>
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

                    ) : members.length === 0 ? (

                        <div className="
                                rounded-lg
                                border
                                p-10
                                text-center
                        ">

                            Aucun membre trouvé

                        </div>

                    ) : (


                        <MemberTable

                            members={members}

                            visibleColumns={columns.visibleColumns}

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

                            onArchive={actions.archive}

                        />

                    )
            }


            <MemberPagination

                page={pagination.page}

                pageSize={pagination.pageSize}

                total={total}

                onPageChange={pagination.setPage}

                onPageSizeChange={
                    pagination.setPageSize
                }

            />
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