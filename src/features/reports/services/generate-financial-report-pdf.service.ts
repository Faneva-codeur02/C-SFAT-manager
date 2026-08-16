import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { CategoryReportRow } from "../types/report.types";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

export function generateFinancialReportPdf(

    seasonName: string,

    rows: CategoryReportRow[],

    totalIncome: number,

    totalExpense: number,

) {

    const pdf = new jsPDF();


    const logo = "/logo_csfat.png";

    pdf.addImage(logo, "PNG", 15, 10, 25, 25);


    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");

    pdf.text(
        "Chorale Saint François d'Assise Tsiadana",
        105,
        20,
        { align: "center" },
    );

    pdf.setFontSize(13);
    pdf.setFont("helvetica", "normal");

    pdf.text(
        `Rapport financier — Saison ${seasonName}`,
        105,
        30,
        { align: "center" },
    );

    pdf.line(15, 40, 195, 40);


    const incomeRows = rows.filter((r) => r.categoryType === "income");

    const expenseRows = rows.filter((r) => r.categoryType === "expense");

    autoTable(pdf, {

        startY: 50,

        head: [["Recettes par catégorie", "Montant"]],

        body: incomeRows.map((r) => [r.categoryName, formatAmount(r.total)]),

        foot: [["Total recettes", formatAmount(totalIncome)]],

        styles: { fontSize: 9 },

        headStyles: { fillColor: [30, 100, 200], textColor: 255 },

        footStyles: { fillColor: [230, 245, 235], textColor: 20, fontStyle: "bold" },

    });


    autoTable(pdf, {

        startY: (pdf as any).lastAutoTable.finalY + 15,

        head: [["Dépenses par catégorie", "Montant"]],

        body: expenseRows.map((r) => [r.categoryName, formatAmount(r.total)]),

        foot: [["Total dépenses", formatAmount(totalExpense)]],

        styles: { fontSize: 9 },

        headStyles: { fillColor: [200, 60, 60], textColor: 255 },

        footStyles: { fillColor: [250, 235, 235], textColor: 20, fontStyle: "bold" },

    });


    const net = totalIncome - totalExpense;

    autoTable(pdf, {

        startY: (pdf as any).lastAutoTable.finalY + 15,

        body: [["Résultat net de la saison", formatAmount(net)]],

        theme: "grid",

        styles: { fontSize: 11, cellPadding: 6, fontStyle: "bold" },

    });


    const pageHeight =
        pdf.internal.pageSize.height;

    pdf.setFontSize(8);

    pdf.text(

        "Document généré automatiquement par C-SFAT Manager",

        105,

        pageHeight - 10,

        { align: "center" },

    );

    pdf.save(`rapport-financier-${seasonName}.pdf`);

}