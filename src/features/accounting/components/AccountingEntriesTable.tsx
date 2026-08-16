import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";

import type { AccountingEntryWithDetails } from "../types/accounting.types";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

type Props = {

    entries: AccountingEntryWithDetails[];

};

export default function AccountingEntriesTable({ entries }: Props) {

    return (

        <div className="rounded-lg border bg-card">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Date</TableHead>

                        <TableHead>Type</TableHead>

                        <TableHead>Catégorie</TableHead>

                        <TableHead>Compte</TableHead>

                        <TableHead>Description</TableHead>

                        <TableHead className="text-right">Montant</TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {entries.map((entry) => (

                        <TableRow key={entry.id}>

                            <TableCell>

                                {new Date(entry.entry_date).toLocaleDateString("fr-FR")}

                            </TableCell>

                            <TableCell>

                                {entry.entry_type === "income" ? (

                                    <Badge>Recette</Badge>

                                ) : (

                                    <Badge variant="destructive">Dépense</Badge>

                                )}

                            </TableCell>

                            <TableCell>

                                {entry.category.name}

                            </TableCell>

                            <TableCell>

                                {entry.financial_account.name}

                            </TableCell>

                            <TableCell className="text-muted-foreground">

                                {entry.description ?? "-"}

                            </TableCell>

                            <TableCell

                                className={

                                    entry.entry_type === "income"

                                        ? "text-right text-green-600 font-medium"

                                        : "text-right text-destructive font-medium"

                                }

                            >

                                {entry.entry_type === "income" ? "+" : "-"}{formatAmount(entry.amount)}

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </div>

    );

}