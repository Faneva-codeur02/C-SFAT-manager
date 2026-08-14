import AppLayout from "@/app/layouts/AppLayout";
import Pagination from "@/shared/components/Pagination";
import { useSearch } from "@/shared/context/SearchContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePagination } from "@/shared/hooks/usePagination";
import { useEffect } from "react";

import ContributionTable from "@/features/contributions/components/ContributionTable";
import ContributionFiltersBar from "@/features/contributions/components/ContributionFiltersBar";
import { useContributions } from "@/features/contributions/hooks/useContributions";
import { useContributionFilters } from "@/features/contributions/hooks/useContributionFilters";
import { useContributionPeriods } from "@/features/contributions/hooks/useContributionPeriods";
import { useContributionDialogs } from "@/features/contributions/hooks/useContributionDialogs";
import RecordPaymentDialog from "@/features/contributions/dialogs/RecordPaymentDialog";
import ContributionHistoryDialog from "@/features/contributions/dialogs/ContributionHistoryDialog";
import ContributionsTableSkeleton from "../components/ContributionsTableSkeleton";
import ContributionsEmptyState from "../components/ContributionsEmptyState";

export default function Contributions() {

    const filters =
        useContributionFilters();

    const { search } = useSearch();

    const debouncedSearch =
        useDebounce(search, 500);

    const pagination =
        usePagination();

    const {
        contributions,
        total,
        loading,
        loadContributions,
    } = useContributions(
        { ...filters, search },
        pagination,
    );

    const { periods } =
        useContributionPeriods();

    const dialogs =
        useContributionDialogs();

    useEffect(() => {

        pagination.setPage(0);

    }, [
        debouncedSearch,
        filters.status,
        filters.contributionPeriodId,
        filters.sortBy,
    ]);

    return (

        <AppLayout>

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Cotisations
                </h1>

            </div>

            <ContributionFiltersBar

                status={filters.status}

                periods={periods}

                contributionPeriodId={filters.contributionPeriodId}

                onStatusChange={filters.setStatus}

                onPeriodChange={filters.setContributionPeriodId}

            />

            {loading ? (

                <ContributionsTableSkeleton />

            ) : contributions.length === 0 ? (

                <ContributionsEmptyState />

            ) : (

                <ContributionTable

                    contributions={contributions}

                    sortBy={filters.sortBy}

                    order={filters.order}

                    onSort={filters.handleSort}

                    onViewHistory={dialogs.openHistory}

                    onRecordPayment={dialogs.openPayment}

                />

            )}

            <Pagination

                page={pagination.page}

                pageSize={pagination.pageSize}

                total={total}

                itemLabel="cotisation(s)"

                onPageChange={pagination.setPage}

                onPageSizeChange={pagination.setPageSize}

            />

            <RecordPaymentDialog

                contribution={dialogs.selectedContribution}

                open={dialogs.dialogType === "payment"}

                onOpenChange={(open) => {

                    if (!open) dialogs.closeDialog();

                }}

                onPaid={loadContributions}

            />

            <ContributionHistoryDialog

                contribution={dialogs.selectedContribution}

                open={dialogs.dialogType === "history"}

                onOpenChange={(open) => {

                    if (!open) dialogs.closeDialog();

                }}

            />

        </AppLayout>

    );

}