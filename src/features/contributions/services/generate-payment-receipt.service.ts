import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type {
    Payment,
    PaymentAllocationWithPeriod,
} from "../types/contribution.types";

const paymentMethodLabels: Record<string, string> = {

    cash: "Espèces",

    mobile_money: "Mobile Money",

    bank_transfer: "Virement",

    other: "Autre",

};

export function generatePaymentReceipt(

    payment: Payment,

    memberName: string,

    memberNumber: string | null,

    allocations: PaymentAllocationWithPeriod[],

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
        "Reçu de paiement de cotisation",
        105,
        30,
        { align: "center" },
    );

    pdf.line(15, 40, 195, 40);


    const receiptNumber =
        payment.id.slice(0, 8).toUpperCase();

    autoTable(pdf, {

        startY: 50,

        body: [

            ["N° de reçu", receiptNumber],

            ["Date du paiement", new Date(payment.payment_date).toLocaleDateString("fr-FR")],

            ["Membre", memberName],

            ["N° membre", memberNumber ?? "-"],

            ["Montant total payé", `${payment.amount.toLocaleString("fr-FR")} Ar`],

        ],

        theme: "grid",

        styles: { fontSize: 10, cellPadding: 5 },

        columnStyles: {

            0: { fontStyle: "bold", cellWidth: 50 },

            1: { cellWidth: 100 },

        },

    });


    autoTable(pdf, {

        startY: (pdf as any).lastAutoTable.finalY + 15,

        head: [["Période couverte", "Montant alloué"]],

        body: allocations.map((allocation) => [

            new Date(allocation.contribution_period.period_start)
                .toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),

            `${allocation.allocated_amount.toLocaleString("fr-FR")} Ar`,

        ]),

        styles: { fontSize: 9 },

        headStyles: { fillColor: [30, 100, 200], textColor: 255 },

    });


    autoTable(pdf, {

        startY: (pdf as any).lastAutoTable.finalY + 15,

        body: [

            ["Moyen de paiement", paymentMethodLabels[payment.payment_method] ?? payment.payment_method],

            ["Référence", payment.reference ?? "-"],

            ["Note", payment.note ?? "-"],

        ],

        theme: "grid",

        styles: { fontSize: 10, cellPadding: 5 },

        columnStyles: {

            0: { fontStyle: "bold", cellWidth: 50 },

            1: { cellWidth: 100 },

        },

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

    pdf.save(`recu-${receiptNumber}.pdf`);

}