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
import { useDebounce } from "@/shared/hooks/useDebounce";
import InvitationSearch from "../components/InvitationSearch";
import InvitationFilters from "../components/InvitationFilters";
import { useInvitationPagination } from "../hooks/useInvitationPagination";
import InvitationPagination from "../components/InvitationPagination";
import { useInvitationSelection } from "../hooks/useInvitationSelection";
import { useBulkInvitationActions } from "../hooks/useBulkInvitationActions";
import InvitationBulkActions from "../components/InvitationBulkActions";
import InvitationTableSkeleton from "../components/InvitationTableSkeleton";
import InvitationEmptyState from "../components/InvitationEmptyState";

export default function Invitations() {
    const selection =
        useInvitationSelection();

    const filters =
        useInvitationFilters();

    const debouncedSearch =
        useDebounce(
            filters.search,
            500
        );

    const pagination =

        useInvitationPagination();

    const {
        codes,
        total,
        loading,
        reload,
    } = useInvitationCodes({

        search: debouncedSearch,

        status: filters.status,

        sortBy: filters.sortBy,

        order: filters.order,

    },

        pagination,
    );

    const bulk =

        useBulkInvitationActions({

            reload,

            clear: selection.clear,

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

                <InvitationFilters

                    status={filters.status}

                    onStatusChange={
                        filters.setStatus
                    }

                />



            </div>
            <InvitationBulkActions

                count={

                    selection.selectedIds.length

                }

                onCopy={() =>

                    bulk.copy(
                        selection.selectedIds
                    )

                }

                onDelete={() =>

                    bulk.remove(

                        selection.selectedIds

                    )

                }

                onExport={() =>

                    bulk.exportCSV(
                        selection.selectedIds
                    )

                }

            />
            {loading ? (

                <InvitationTableSkeleton />

            ) : codes.length === 0 ? (

                <InvitationEmptyState

                    hasFilters={
                        filters.search !== "" ||
                        filters.status !== "all"
                    }

                />

            ) : (

                <InvitationTable

                    codes={codes}

                    sortBy={filters.sortBy}

                    order={filters.order}

                    onSort={filters.handleSort}

                    onDelete={setSelected}

                    selectedIds={selection.selectedIds}

                    onToggle={selection.toggle}

                    onToggleAll={selection.toggleAll}

                />

            )}
            <InvitationPagination

                page={pagination.page}

                pageSize={pagination.pageSize}

                total={total}

                onPageChange={

                    pagination.setPage

                }

                onPageSizeChange={

                    pagination.setPageSize

                }

            />
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