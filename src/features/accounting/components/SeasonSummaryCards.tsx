import type { SeasonAccountingSummary } from "../services/accounting.service";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

type Props = {

    summary: SeasonAccountingSummary;

    loading: boolean;

};

export default function SeasonSummaryCards({ summary, loading }: Props) {



    const net = summary.totalIncome - summary.totalExpense;

    return (

        <div className="grid grid-cols-3 gap-3 mb-6">

            <div className="rounded-lg border bg-card p-4">

                <div className="text-sm text-muted-foreground mb-1">Recettes</div>

                <div className="text-xl font-semibold text-green-600">

                    {loading ? "..." : `+${formatAmount(summary.totalIncome)}`}

                </div>

            </div>

            <div className="rounded-lg border bg-card p-4">

                <div className="text-sm text-muted-foreground mb-1">Dépenses</div>

                <div className="text-xl font-semibold text-destructive">

                    {loading ? "..." : `-${formatAmount(summary.totalExpense)}`}

                </div>

            </div>

            <div className="rounded-lg border bg-card p-4">

                <div className="text-sm text-muted-foreground mb-1">Net</div>

                <div className={

                    "text-xl font-semibold " + (net >= 0 ? "text-green-600" : "text-destructive")

                }>

                    {loading ? "..." : `${net >= 0 ? "+" : ""}${formatAmount(net)}`}

                </div>

            </div>

        </div>

    );

}