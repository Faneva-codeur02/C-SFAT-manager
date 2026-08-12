import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";

import ContributionStatusBadge from "../components/ContributionStatusBadge";
import { useContributionsByProfile } from "../hooks/useContributionsByProfile";
import { usePaymentsByProfile } from "../hooks/usePaymentsByProfile";
import type { MemberContributionWithDetails } from "../types/contribution.types";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

type Props = {

    contribution: MemberContributionWithDetails | null;

    open: boolean;

    onOpenChange(open: boolean): void;

};

export default function ContributionHistoryDialog({
    contribution,
    open,
    onOpenChange,
}: Props) {

    const profileId = contribution?.profile_id ?? "";

    const { contributions, loading: loadingContributions } =
        useContributionsByProfile(profileId);

    const { payments, loading: loadingPayments } =
        usePaymentsByProfile(profileId);

    if (!contribution) return null;

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        Historique — {contribution.profile.nom} {contribution.profile.prenom}

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-6">

                    <div>

                        <h3 className="text-sm font-semibold mb-2">
                            Cotisations
                        </h3>

                        {loadingContributions ? (

                            <p className="text-sm text-muted-foreground">
                                Chargement...
                            </p>

                        ) : (

                            <div className="space-y-2">

                                {contributions.map((item) => (

                                    <div

                                        key={item.id}

                                        className="flex items-center justify-between text-sm border rounded-md px-3 py-2"

                                    >

                                        <span>

                                            Semaine {item.contribution_period.week_number}
                                            {" — "}
                                            {formatAmount(item.amount_paid)} / {formatAmount(item.amount_due)}

                                        </span>

                                        <ContributionStatusBadge

                                            status={item.status}

                                            dueDate={item.contribution_period.due_date}

                                        />

                                    </div>

                                ))}

                                {contributions.length === 0 && (

                                    <p className="text-sm text-muted-foreground">
                                        Aucune cotisation trouvée.
                                    </p>

                                )}

                            </div>

                        )}

                    </div>

                    <div>

                        <h3 className="text-sm font-semibold mb-2">
                            Paiements
                        </h3>

                        {loadingPayments ? (

                            <p className="text-sm text-muted-foreground">
                                Chargement...
                            </p>

                        ) : (

                            <div className="space-y-2">

                                {payments.map((payment) => (

                                    <div

                                        key={payment.id}

                                        className="flex items-center justify-between text-sm border rounded-md px-3 py-2"

                                    >

                                        <span>

                                            {new Date(payment.payment_date).toLocaleDateString("fr-FR")}
                                            {" — "}
                                            {formatAmount(payment.amount)}
                                            {" — "}
                                            {payment.payment_method}

                                        </span>

                                        {payment.reference && (

                                            <span className="text-xs text-muted-foreground">

                                                Réf. {payment.reference}

                                            </span>

                                        )}

                                    </div>

                                ))}

                                {payments.length === 0 && (

                                    <p className="text-sm text-muted-foreground">
                                        Aucun paiement trouvé.
                                    </p>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            </DialogContent>

        </Dialog>

    );

}