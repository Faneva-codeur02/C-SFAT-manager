import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";

import { useContributionSummary } from "../hooks/useContributionSummary";
import type { SelectedMember } from "../types/contribution.types";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

type Props = {

    member: SelectedMember | null;

    open: boolean;

    onOpenChange(open: boolean): void;

};

export default function ContributionHistoryDialog({
    member,
    open,
    onOpenChange,
}: Props) {

    const profileId = member?.id;

    const { summary, loading } =
        useContributionSummary(profileId);

    if (!member) return null;

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        {member.nom} {member.prenom}

                    </DialogTitle>

                </DialogHeader>

                {loading ? (

                    <p className="text-sm text-muted-foreground">
                        Chargement...
                    </p>

                ) : (

                    <div className="space-y-3 text-sm">

                        <div className="flex items-center justify-between border rounded-md px-3 py-2">

                            <span className="text-muted-foreground">

                                Mois dus (jusqu'à aujourd'hui)

                            </span>

                            <span className="font-semibold">

                                {summary.monthsOwed}

                            </span>

                        </div>

                        <div className="flex items-center justify-between border rounded-md px-3 py-2">

                            <span className="text-muted-foreground">

                                Montant total dû

                            </span>

                            <span className="font-semibold">

                                {formatAmount(summary.totalDue)}

                            </span>

                        </div>

                        <div className="flex items-center justify-between border rounded-md px-3 py-2">

                            <span className="text-muted-foreground">

                                Dernière cotisation payée

                            </span>

                            <span className="font-semibold">

                                {summary.lastPaidPeriodStart

                                    ? new Date(summary.lastPaidPeriodStart)
                                        .toLocaleDateString("fr-FR", { month: "long", year: "numeric" })

                                    : "Aucune"}

                            </span>

                        </div>

                    </div>

                )}

            </DialogContent>

        </Dialog>

    );

}