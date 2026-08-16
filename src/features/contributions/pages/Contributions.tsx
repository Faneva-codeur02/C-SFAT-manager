import AppLayout from "@/app/layouts/AppLayout";
import { useSearch } from "@/shared/context/SearchContext";
import { useEffect, useMemo, useState } from "react";

import ContributionsYearGrid from "@/features/contributions/components/ContributionsYearGrid";
import SeasonSelector from "@/shared/components/SeasonSelector";
import ContributionsEmptyState from "@/features/contributions/components/ContributionsEmptyState";
import ContributionsTableSkeleton from "@/features/contributions/components/ContributionsTableSkeleton";
import { useSeasons } from "@/shared/hooks/useSeasons";
import { useContributionsGrid } from "@/features/contributions/hooks/useContributionsGrid";
import { useContributionDialogs } from "@/features/contributions/hooks/useContributionDialogs";
import RecordPaymentDialog from "@/features/contributions/dialogs/RecordPaymentDialog";
import ContributionHistoryDialog from "@/features/contributions/dialogs/ContributionHistoryDialog";

export default function Cotisations() {

    const { seasons, loading: loadingSeasons, reloadSeasons } = useSeasons();

    const [selectedSeasonId, setSelectedSeasonId] = useState<string>();

    useEffect(() => {

        if (!selectedSeasonId && seasons.length > 0) {

            const current = seasons.find((s) => s.is_current);

            setSelectedSeasonId((current ?? seasons[seasons.length - 1]).id);

        }

    }, [seasons, selectedSeasonId]);

    const { rows, loading: loadingGrid, reloadGrid } =
        useContributionsGrid(selectedSeasonId);

    const { search } = useSearch();

    const filteredRows = useMemo(() => {

        if (!search) return rows;

        const term = search.trim().toLowerCase();

        return rows.filter((row) =>

            `${row.profile.nom} ${row.profile.prenom}`.toLowerCase().includes(term)

        );

    }, [rows, search]);

    const dialogs = useContributionDialogs();

    return (

        <AppLayout>

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Cotisations
                </h1>

            </div>

            <div className="flex gap-6">

                <div className="flex-1">

                    {loadingGrid ? (

                        <ContributionsTableSkeleton />

                    ) : filteredRows.length === 0 ? (

                        <ContributionsEmptyState />

                    ) : (

                        <ContributionsYearGrid

                            rows={filteredRows}

                            onViewHistory={dialogs.openHistory}

                            onRecordPayment={dialogs.openPayment}

                        />

                    )}

                </div>

                {!loadingSeasons && (

                    <SeasonSelector

                        seasons={seasons}

                        selectedSeasonId={selectedSeasonId}

                        onSelect={setSelectedSeasonId}

                    />

                )}

            </div>

            <RecordPaymentDialog

                member={dialogs.selectedMember}

                open={dialogs.dialogType === "payment"}

                onOpenChange={(open) => {

                    if (!open) dialogs.closeDialog();

                }}

                onPaid={() => {

                    reloadGrid();

                    reloadSeasons();

                }}

            />

            <ContributionHistoryDialog

                member={dialogs.selectedMember}

                open={dialogs.dialogType === "history"}

                onOpenChange={(open) => {

                    if (!open) dialogs.closeDialog();

                }}

            />

        </AppLayout>

    );

}