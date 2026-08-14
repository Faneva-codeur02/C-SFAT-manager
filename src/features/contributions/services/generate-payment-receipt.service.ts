import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type {
    Payment,
    MemberContributionWithDetails,
} from "../types/contribution.types";

const paymentMethodLabels: Record<string, string> = {

    cash: "Espèces",

    mobile_money: "Mobile Money",

    bank_transfer: "Virement",

    other: "Autre",

};

export function generatePaymentReceipt(

    payment: Payment,

    contribution: MemberContributionWithDetails,

    remainingBefore: number,

) {

    const pdf = new jsPDF();


    // ==========================
    // LOGO
    // ==========================

    const logo = "/logo_csfat.png";

    pdf.addImage(
        logo,
        "PNG",
        15,
        10,
        25,
        25
    );


    // ==========================
    // HEADER
    // ==========================

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


    // ==========================
    // INFOS REÇU / MEMBRE
    // ==========================

    const receiptNumber =
        payment.id.slice(0, 8).toUpperCase();

    autoTable(pdf, {

        startY: 50,

        body: [

            ["N° de reçu", receiptNumber],

            ["Date du paiement", new Date(payment.payment_date).toLocaleDateString("fr-FR")],

            ["Membre", `${contribution.profile.nom} ${contribution.profile.prenom}`],

            ["N° membre", contribution.profile.member_number ?? "-"],

        ],

        theme: "grid",

        styles: { fontSize: 10, cellPadding: 5 },

        columnStyles: {

            0: { fontStyle: "bold", cellWidth: 50 },

            1: { cellWidth: 100 },

        },

    });


    // ==========================
    // DÉTAIL DE LA COTISATION
    // ==========================

    autoTable(pdf, {

        startY: (pdf as any).lastAutoTable.finalY + 15,

        head: [["Période", "Montant dû", "Montant payé (ce paiement)", "Solde restant"]],

        body: [[

            `Semaine ${contribution.contribution_period.week_number}`,

            `${contribution.amount_due.toLocaleString("fr-FR")} Ar`,

            `${payment.amount.toLocaleString("fr-FR")} Ar`,

            `${Math.max(0, remainingBefore - payment.amount).toLocaleString("fr-FR")} Ar`,

        ]],

        styles: { fontSize: 9 },

        headStyles: { fillColor: [30, 100, 200], textColor: 255 },

    });


    // ==========================
    // MOYEN DE PAIEMENT
    // ==========================

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


    // ==========================
    // FOOTER
    // ==========================

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