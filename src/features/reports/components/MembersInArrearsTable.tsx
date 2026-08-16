import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import type { MemberArrearsRow } from "../types/report.types";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

type Props = {

    rows: MemberArrearsRow[];

};

export default function MembersInArrearsTable({ rows }: Props) {

    return (

        <div className="rounded-lg border bg-card">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Membre</TableHead>

                        <TableHead>Mois en retard</TableHead>

                        <TableHead className="text-right">Montant dû</TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {rows.map((row) => (

                        <TableRow key={row.profileId}>

                            <TableCell>

                                {row.nom} {row.prenom}

                                <div className="text-xs text-muted-foreground">

                                    {row.memberNumber}

                                </div>

                            </TableCell>

                            <TableCell>{row.monthsOwed}</TableCell>

                            <TableCell className="text-right text-destructive font-medium">

                                {formatAmount(row.totalOwed)}

                            </TableCell>

                        </TableRow>

                    ))}

                    {rows.length === 0 && (

                        <TableRow>

                            <TableCell colSpan={3} className="text-center text-muted-foreground py-8">

                                Aucun membre en retard 🎉

                            </TableCell>

                        </TableRow>

                    )}

                </TableBody>

            </Table>

        </div>

    );

}