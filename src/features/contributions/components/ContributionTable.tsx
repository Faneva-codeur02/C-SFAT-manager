import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
    Eye,
    Wallet,
} from "lucide-react";

import type { MemberContributionWithDetails } from "../types/contribution.types";
import type { ContributionSort } from "../types/contribution-filter";

type Props = {

    contributions: MemberContributionWithDetails[];

    sortBy: ContributionSort;

    order: "asc" | "desc";

    onSort(column: ContributionSort): void;

    onViewHistory(contribution: MemberContributionWithDetails): void;

    onRecordPayment(contribution: MemberContributionWithDetails): void;

};

function isLate(
    contribution: MemberContributionWithDetails
): boolean {

    if (
        contribution.status === "paid" ||
        contribution.status === "cancelled"
    ) {

        return false;

    }

    return (
        new Date(contribution.contribution_period.due_date) < new Date()
    );

}

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

export default function ContributionTable({
    contributions,
    sortBy,
    order,
    onSort,
    onViewHistory,
    onRecordPayment,
}: Props) {

    function renderSortIcon(
        column: ContributionSort
    ) {

        if (sortBy !== column) {

            return (
                <ArrowUpDown
                    className="
                    ml-2
                    h-4
                    w-4
                    text-muted-foreground
                "
                />
            );

        }

        if (order === "asc") {

            return (
                <ArrowUp
                    className="
                    ml-2
                    h-4
                    w-4
                    text-primary
                "
                />
            );

        }

        return (

            <ArrowDown

                className="
                ml-2
                h-4
                w-4
                text-primary
            "

            />

        );

    }

    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>

                        <TableHead>

                            <button

                                onClick={() => onSort("name")}

                                className="
                                    flex
                                    items-center
                                    font-semibold
                                "

                            >

                                Membre

                                {renderSortIcon("name")}

                            </button>

                        </TableHead>

                        <TableHead>
                            Période
                        </TableHead>

                        <TableHead>

                            <button

                                onClick={() => onSort("dueDate")}

                                className="
                                    flex
                                    items-center
                                    font-semibold
                                "

                            >

                                Échéance

                                {renderSortIcon("dueDate")}

                            </button>

                        </TableHead>

                        <TableHead>

                            <button

                                onClick={() => onSort("amount")}

                                className="
                                    flex
                                    items-center
                                    font-semibold
                                "

                            >

                                Montant dû

                                {renderSortIcon("amount")}

                            </button>

                        </TableHead>

                        <TableHead>
                            Payé
                        </TableHead>

                        <TableHead>
                            Statut
                        </TableHead>

                        <TableHead className="text-right">
                            Actions
                        </TableHead>

                    </TableRow>
                </TableHeader>

                <TableBody>
                    {contributions.map((contribution) => (
                        <TableRow key={contribution.id}>

                            <TableCell>

                                {contribution.profile.nom} {contribution.profile.prenom}

                                <div className="text-xs text-muted-foreground">

                                    {contribution.profile.member_number}

                                </div>

                            </TableCell>

                            <TableCell>

                                Semaine {contribution.contribution_period.week_number}

                            </TableCell>

                            <TableCell>

                                {
                                    new Date(
                                        contribution.contribution_period.due_date
                                    )
                                        .toLocaleDateString("fr-FR")
                                }

                            </TableCell>

                            <TableCell>

                                {formatAmount(contribution.amount_due)}

                            </TableCell>

                            <TableCell>

                                {formatAmount(contribution.amount_paid)}

                            </TableCell>

                            <TableCell>

                                {contribution.status === "paid" && (

                                    <Badge>
                                        Payé
                                    </Badge>

                                )}

                                {contribution.status === "partial" && (

                                    <Badge variant="secondary">
                                        Partiel
                                    </Badge>

                                )}

                                {contribution.status === "cancelled" && (

                                    <Badge variant="outline">
                                        Annulé
                                    </Badge>

                                )}

                                {contribution.status === "pending" && (

                                    isLate(contribution) ? (

                                        <Badge variant="destructive">
                                            En retard
                                        </Badge>

                                    ) : (

                                        <Badge variant="secondary">
                                            En attente
                                        </Badge>

                                    )

                                )}

                            </TableCell>

                            <TableCell className="text-right">

                                <div className="flex justify-end gap-2">

                                    <Button

                                        variant="ghost"

                                        size="icon"

                                        onClick={() => onViewHistory(contribution)}

                                    >

                                        <Eye className="h-4 w-4" />

                                    </Button>

                                    {contribution.status !== "paid" && (

                                        <Button

                                            variant="ghost"

                                            size="icon"

                                            onClick={() => onRecordPayment(contribution)}

                                        >

                                            <Wallet className="h-4 w-4" />

                                        </Button>

                                    )}

                                </div>

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}