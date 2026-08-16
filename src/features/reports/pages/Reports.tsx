import { useEffect, useState } from "react";

import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import SeasonSelector from "@/shared/components/SeasonSelector";
import { useSeasons } from "@/shared/hooks/useSeasons";

import SeasonSummaryCards from "@/features/accounting/components/SeasonSummaryCards";
import { useSeasonAccountingSummary } from "@/features/accounting/hooks/useSeasonAccountingSummary";

import CategoryReportTable from "@/features/reports/components/CategoryReportTable";
import { useCategoryReport } from "@/features/reports/hooks/useCategoryReport";
import { generateFinancialReportPdf } from "@/features/reports/services/generate-financial-report-pdf.service";

import ContributionRateCards from "@/features/reports/components/ContributionRateCards";
import MembersInArrearsTable from "@/features/reports/components/MembersInArrearsTable";
import { useContributionRateSummary } from "@/features/reports/hooks/useContributionRateSummary";
import { useMembersInArrears } from "@/features/reports/hooks/useMembersInArrears";

export default function Reports() {

    const { seasons } = useSeasons();

    const [selectedSeasonId, setSelectedSeasonId] = useState<string>();

    const [activeTab, setActiveTab] = useState<"financial" | "contributions">("financial");

    const { summary: rateSummary, loading: loadingRate } =
        useContributionRateSummary();

    const { rows: arrearsRows, loading: loadingArrears } =
        useMembersInArrears();

    useEffect(() => {

        if (!selectedSeasonId && seasons.length > 0) {

            const current = seasons.find((s) => s.is_current);

            setSelectedSeasonId((current ?? seasons[seasons.length - 1]).id);

        }

    }, [seasons, selectedSeasonId]);

    const selectedSeason =
        seasons.find((s) => s.id === selectedSeasonId);

    const { rows, loading: loadingRows } =
        useCategoryReport(selectedSeasonId);

    const { summary, loading: loadingSummary } =
        useSeasonAccountingSummary(selectedSeasonId);

    function handleExportPdf() {

        if (!selectedSeason) return;

        generateFinancialReportPdf(

            selectedSeason.name,

            rows,

            summary.totalIncome,

            summary.totalExpense,

        );

    }

    return (

        <AppLayout>

            <div className="flex items-center justify-between mb-4">

                <h1 className="text-3xl font-bold">
                    Rapports
                </h1>

                {activeTab === "financial" && (

                    <Button

                        onClick={handleExportPdf}

                        disabled={loadingRows || loadingSummary}

                    >

                        Exporter en PDF

                    </Button>

                )}

            </div>

            <div className="flex gap-2 mb-6">

                <Button

                    variant={activeTab === "financial" ? "default" : "outline"}

                    onClick={() => setActiveTab("financial")}

                >

                    Rapport financier

                </Button>

                <Button

                    variant={activeTab === "contributions" ? "default" : "outline"}

                    onClick={() => setActiveTab("contributions")}

                >

                    Rapport de cotisations

                </Button>

            </div>

            <div className="flex gap-6">

                <div className="flex-1">

                    {activeTab === "financial" ? (

                        <>

                            <SeasonSummaryCards summary={summary} loading={loadingSummary} />

                            {loadingRows ? (

                                <p className="text-muted-foreground">Chargement...</p>

                            ) : (

                                <CategoryReportTable rows={rows} />

                            )}

                        </>

                    ) : (

                        <>

                            <ContributionRateCards summary={rateSummary} loading={loadingRate} />

                            {loadingArrears ? (

                                <p className="text-muted-foreground">Chargement...</p>

                            ) : (

                                <MembersInArrearsTable rows={arrearsRows} />

                            )}

                        </>

                    )}

                </div>

                {activeTab === "financial" && (

                    <SeasonSelector

                        seasons={seasons}

                        selectedSeasonId={selectedSeasonId}

                        onSelect={setSelectedSeasonId}

                    />

                )}

            </div>

        </AppLayout>

    );

}