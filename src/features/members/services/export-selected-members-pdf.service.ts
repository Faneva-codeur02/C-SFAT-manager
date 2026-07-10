import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Profile } from "@/types";
import type { MemberColumnKey } from "../types/member-column";


export function exportMembersPDF(
    members: Profile[],
    visibleColumns: MemberColumnKey[]

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
        {
            align: "center"
        }
    );


    pdf.setFontSize(13);
    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.text(
        "Liste des membres",
        105,
        30,
        {
            align: "center"
        }
    );


    // ligne séparation

    pdf.line(
        15,
        40,
        195,
        40
    );


    // ==========================
    // STATISTIQUES
    // ==========================


    const total =
        members.length;


    const soprano =
        members.filter(
            m => m.voice_part === "soprano"
        ).length;


    const alto =
        members.filter(
            m => m.voice_part === "alto"
        ).length;


    const tenor =
        members.filter(
            m => m.voice_part === "tenor"
        ).length;


    const bass =
        members.filter(
            m => m.voice_part === "bass"
        ).length;



    const stats = [

        [
            "Date",
            new Date()
                .toLocaleDateString()
        ],

        [
            "Total membres",
            total.toString()
        ],

        [
            "Soprano",
            soprano.toString()
        ],

        [
            "Alto",
            alto.toString()
        ],

        [
            "Ténor",
            tenor.toString()
        ],

        [
            "Basse",
            bass.toString()
        ],

    ];

    const columnLabels = {

        nom: "Nom",

        prenom: "Prénom",

        voice_part: "Pupitre",

        status: "Statut",

        email: "Email",

        member_number: "N° membre",

        created_at: "Date inscription",

    };

    const headers =
        visibleColumns.map(
            column =>
                columnLabels[column]
        );



    autoTable(pdf, {

        startY: 50,

        body: stats,

        theme: "grid",

        styles: {
            fontSize: 10,
            cellPadding: 5
        },

        columnStyles: {

            0: {
                fontStyle: "bold",
                cellWidth: 45
            },

            1: {
                cellWidth: 45
            }

        }

    });



    // ==========================
    // TABLEAU MEMBRES
    // ==========================


    autoTable(pdf, {

        startY:
            (pdf as any)
                .lastAutoTable.finalY + 15,


        head: [
            headers
        ],


        body:

            members.map(member =>

                visibleColumns.map(column => {

                    switch (column) {

                        case "nom":
                            return member.nom;

                        case "prenom":
                            return member.prenom;

                        case "voice_part":
                            return member.voice_part ?? "-";

                        case "status":
                            return member.status;

                        case "email":
                            return member.email;

                        case "member_number":
                            return member.member_number ?? "-";

                        case "created_at":
                            return new Date(
                                member.created_at
                            ).toLocaleDateString();


                        default:
                            return "-";

                    }

                })

            ),


        styles: {

            fontSize: 9

        },


        headStyles: {

            fillColor: [
                30,
                100,
                200
            ],

            textColor: 255

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

        {
            align: "center"
        }

    );


    pdf.save(
        `membres-${Date.now()}.pdf`
    );

}