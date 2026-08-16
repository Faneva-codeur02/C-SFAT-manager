import type { ContributionRateSummary } from "../types/report.types";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

type Props = {

    summary: ContributionRateSummary;

    loading: boolean;

};

export default function ContributionRateCards({ summary, loading }: Props) {

    const rate =

        summary.totalDue > 0

            ? Math.round((summary.totalPaid / summary.totalDue) * 100)

            : 0;

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">

            <div className="rounded-lg border bg-card p-4">

                <div className="text-sm text-muted-foreground mb-1">Taux de paiement</div>

                <div className="text-xl font-semibold">

                    {loading ? "..." : `${rate}%`}

                </div>

            </div>

            <div className="rounded-lg border bg-card p-4">

                <div className="text-sm text-muted-foreground mb-1">Montant dû (total)</div>

                <div className="text-xl font-semibold">

                    {loading ? "..." : formatAmount(summary.totalDue - summary.totalPaid)}

                </div>

            </div>

            <div className="rounded-lg border bg-card p-4">

                <div className="text-sm text-muted-foreground mb-1">Membres à jour</div>

                <div className="text-xl font-semibold text-green-600">

                    {loading ? "..." : summary.memberCountUpToDate}

                </div>

            </div>

            <div className="rounded-lg border bg-card p-4">

                <div className="text-sm text-muted-foreground mb-1">Membres en retard</div>

                <div className="text-xl font-semibold text-destructive">

                    {loading ? "..." : summary.memberCountLate}

                </div>

            </div>

        </div>

    );

}