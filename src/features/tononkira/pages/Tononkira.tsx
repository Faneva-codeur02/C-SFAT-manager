import { useEffect, useState } from "react";

import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import Pagination from "@/shared/components/Pagination";
import ConfirmActionDialog from "@/shared/components/dialogs/ConfirmActionDialog";
import { usePagination } from "@/shared/hooks/usePagination";

import { usePermission } from "@/features/auth/hooks/usePermission";
import { PERMISSIONS } from "@/auth/permissions";

import TononkiraFormDialog from "@/features/tononkira/dialogs/TononkiraFormDialog";
import TononkiraDetailsDialog from "@/features/tononkira/dialogs/TononkiraDetailsDialog";
import TononkiraTable from "@/features/tononkira/components/TononkiraTable";
import { useTononkiraList } from "@/features/tononkira/hooks/useTononkiraList";
import { useTononkiraFilters } from "@/features/tononkira/hooks/useTononkiraFilters";
import { useTononkiraDialogs } from "@/features/tononkira/hooks/useTononkiraDialogs";
import { useDeleteTononkira } from "@/features/tononkira/hooks/useDeleteTononkira";

export default function Tononkira() {

    const { can } = usePermission();

    const canCreate = can(PERMISSIONS.TONONKIRA_CREATE);

    const filters = useTononkiraFilters();

    const pagination = usePagination();

    const {
        songs,
        total,
        loading,
        loadSongs,
    } = useTononkiraList(filters, pagination);

    const dialogs = useTononkiraDialogs();

    const { remove, deleting } = useDeleteTononkira();

    useEffect(() => {

        pagination.setPage(0);

    }, [filters.search]);

    async function handleConfirmDelete() {

        if (!dialogs.selectedSong) return;

        const success = await remove(dialogs.selectedSong.id);

        if (success) {

            dialogs.closeDialog();

            loadSongs();

        }

    }

    return (

        <AppLayout>

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Tononkira
                </h1>

                {canCreate && (

                    <Button onClick={dialogs.openCreate}>

                        Nouveau chant

                    </Button>

                )}

            </div>

            {loading ? (

                <p className="text-muted-foreground">Chargement...</p>

            ) : (

                <TononkiraTable

                    songs={songs}

                    onView={dialogs.openDetails}

                    onEdit={dialogs.openEdit}

                    onDelete={dialogs.openDelete}

                />

            )}

            <Pagination

                page={pagination.page}

                pageSize={pagination.pageSize}

                total={total}

                itemLabel="chant(s)"

                onPageChange={pagination.setPage}

                onPageSizeChange={pagination.setPageSize}

            />

            <TononkiraFormDialog

                song={dialogs.dialogType === "form" ? dialogs.selectedSong : null}

                open={dialogs.dialogType === "form"}

                onOpenChange={(open) => {

                    if (!open) dialogs.closeDialog();

                }}

                onSaved={loadSongs}

            />

            <TononkiraDetailsDialog

                song={dialogs.selectedSong}

                open={dialogs.dialogType === "details"}

                onOpenChange={(open) => {

                    if (!open) dialogs.closeDialog();

                }}

            />

            <ConfirmActionDialog

                open={dialogs.dialogType === "delete"}

                title="Supprimer ce chant ?"

                description={`"${dialogs.selectedSong?.title}" sera définitivement supprimé, y compris son audio. Cette action est irréversible.`}

                confirmLabel="Supprimer"

                confirmVariant="destructive"

                loading={deleting}

                onCancel={dialogs.closeDialog}

                onConfirm={handleConfirmDelete}

            />

        </AppLayout>

    );

}