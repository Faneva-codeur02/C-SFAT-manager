import { useEffect, useState } from "react";

import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import Pagination from "@/shared/components/Pagination";
import SeasonSelector from "@/shared/components/SeasonSelector";
import { useSeasons } from "@/shared/hooks/useSeasons";
import { usePagination } from "@/shared/hooks/usePagination";

import ManualEntryDialog from "@/features/accounting/dialogs/ManualEntryDialog";
import AccountingFiltersBar from "@/features/accounting/components/AccountingFiltersBar";
import AccountingEntriesTable from "@/features/accounting/components/AccountingEntriesTable";
import { useAccountingFilters } from "@/features/accounting/hooks/useAccountingFilters";
import { useAccountingEntries } from "@/features/accounting/hooks/useAccountingEntries";

export default function Comptabilite() {

    const [open, setOpen] = useState(false);

    const { seasons } = useSeasons();

    const [selectedSeasonId, setSelectedSeasonId] = useState<string>();

    useEffect(() => {

        if (!selectedSeasonId && seasons.length > 0) {

            const current = seasons.find((s) => s.is_current);

            setSelectedSeasonId((current ?? seasons[seasons.length - 1]).id);

        }

    }, [seasons, selectedSeasonId]);

    const filters = useAccountingFilters();

    const pagination = usePagination();

    const {
        entries,
        total,
        loading,
        loadEntries,
    } = useAccountingEntries(

        { ...filters, seasonId: selectedSeasonId },

        pagination,

    );

    useEffect(() => {

        pagination.setPage(0);

    }, [
        filters.entryType,
        filters.categoryId,
        filters.financialAccountId,
        selectedSeasonId,
    ]);

    return (

        <AppLayout>

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Comptabilité
                </h1>

                <Button onClick={() => setOpen(true)}>

                    Nouvelle écriture

                </Button>

            </div>

            <div className="flex gap-6">

                <div className="flex-1">

                    <AccountingFiltersBar

                        entryType={filters.entryType}

                        categoryId={filters.categoryId}

                        financialAccountId={filters.financialAccountId}

                        onEntryTypeChange={filters.setEntryType}

                        onCategoryChange={filters.setCategoryId}

                        onAccountChange={filters.setFinancialAccountId}

                    />

                    {loading ? (

                        <p className="text-muted-foreground">Chargement...</p>

                    ) : entries.length === 0 ? (

                        <p className="text-muted-foreground">Aucune écriture trouvée.</p>

                    ) : (

                        <AccountingEntriesTable entries={entries} />

                    )}

                    <Pagination

                        page={pagination.page}

                        pageSize={pagination.pageSize}

                        total={total}

                        itemLabel="écriture(s)"

                        onPageChange={pagination.setPage}

                        onPageSizeChange={pagination.setPageSize}

                    />

                </div>

                <SeasonSelector

                    seasons={seasons}

                    selectedSeasonId={selectedSeasonId}

                    onSelect={setSelectedSeasonId}

                />

            </div>

            <ManualEntryDialog

                open={open}

                onOpenChange={setOpen}

                onCreated={loadEntries}

            />

        </AppLayout>

    );

}