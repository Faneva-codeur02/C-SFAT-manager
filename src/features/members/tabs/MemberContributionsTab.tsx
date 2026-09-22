import { CalendarClock, Wallet, CheckCircle2 } from "lucide-react";

import { useContributionSummary } from "@/features/contributions/hooks/useContributionSummary";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

interface Props {

    profileId: string;

}

export default function MemberContributionsTab({ profileId }: Props) {

    const { summary, loading } = useContributionSummary(profileId);

    if (loading) {

        return (

            <div className="rounded-lg border p-8 text-center text-muted-foreground">

                Chargement...

            </div>

        );

    }

    return (

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="flex items-center gap-3 rounded-lg border p-4">

                <CalendarClock className="h-5 w-5 text-muted-foreground" />

                <div>

                    <p className="text-xs text-muted-foreground">

                        Mois dus (jusqu'à aujourd'hui)

                    </p>

                    <p className="font-semibold">

                        {summary.monthsOwed}

                    </p>

                </div>

            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">

                <Wallet className="h-5 w-5 text-muted-foreground" />

                <div>

                    <p className="text-xs text-muted-foreground">

                        Montant total dû

                    </p>

                    <p className="font-semibold">

                        {formatAmount(summary.totalDue)}

                    </p>

                </div>

            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">

                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />

                <div>

                    <p className="text-xs text-muted-foreground">

                        Dernier mois avec un paiement

                    </p>

                    <p className="font-semibold">

                        {summary.lastPaidPeriodStart

                            ? new Date(summary.lastPaidPeriodStart)
                                .toLocaleDateString("fr-FR", { month: "long", year: "numeric" })

                            : "Aucun"}

                    </p>

                </div>

            </div>

        </div>

    );

}