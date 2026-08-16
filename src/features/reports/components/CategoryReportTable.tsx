import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import type { CategoryReportRow } from "../types/report.types";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

type Props = {

    rows: CategoryReportRow[];

};

export default function CategoryReportTable({ rows }: Props) {

    const incomeRows = rows.filter((r) => r.categoryType === "income");

    const expenseRows = rows.filter((r) => r.categoryType === "expense");

    function renderSection(title: string, sectionRows: CategoryReportRow[], colorClass: string) {

        const total = sectionRows.reduce((sum, r) => sum + r.total, 0);

        return (

            <div className="rounded-lg border bg-card mb-4">

                <div className="px-4 py-2 border-b font-semibold">

                    {title}

                </div>

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead>Catégorie</TableHead>

                            <TableHead className="text-right">Montant</TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {sectionRows.map((row) => (

                            <TableRow key={row.categoryId}>

                                <TableCell>{row.categoryName}</TableCell>

                                <TableCell className={`text-right ${colorClass}`}>

                                    {formatAmount(row.total)}

                                </TableCell>

                            </TableRow>

                        ))}

                        {sectionRows.length === 0 && (

                            <TableRow>

                                <TableCell colSpan={2} className="text-center text-muted-foreground">

                                    Aucune écriture

                                </TableCell>

                            </TableRow>

                        )}

                    </TableBody>

                </Table>

                <div className="px-4 py-2 border-t flex justify-between font-semibold">

                    <span>Total</span>

                    <span className={colorClass}>{formatAmount(total)}</span>

                </div>

            </div>

        );

    }

    return (

        <div>

            {renderSection("Recettes par catégorie", incomeRows, "text-green-600")}

            {renderSection("Dépenses par catégorie", expenseRows, "text-destructive")}

        </div>

    );

}