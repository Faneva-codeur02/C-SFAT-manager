import { supabase } from "@/shared/lib/supabase";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type {
    MemberColumnKey,
} from "../types/member-column";


export async function exportSelectedMembersPDF(

    selectedIds: string[],

    visibleColumns: MemberColumnKey[]

) {


    if (!selectedIds.length) {

        throw new Error(
            "Aucun membre sélectionné"
        );

    }


    const {
        data,
        error,

    } = await supabase

        .from("profiles")

        .select("*")

        .in(
            "id",
            selectedIds
        );


    if (error) {

        throw error;

    }



    const members = data ?? [];



    const labels: Record<string, string> = {


        nom:
            "Nom",


        prenom:
            "Prénom",


        email:
            "Email",


        voice_part:
            "Pupitre",


        status:
            "Statut",


        created_at:
            "Date inscription",


    };



    const headers =

        visibleColumns.map(

            column =>
                labels[column] ?? column

        );



    const rows =

        members.map(member =>

            visibleColumns.map(column =>

                member[column] ?? ""

            )

        );



    const pdf =
        new jsPDF();



    pdf.setFontSize(16);


    pdf.text(

        "Liste des membres",

        14,

        15

    );


    pdf.setFontSize(10);


    pdf.text(

        `Imprimé le : ${new Date()
            .toLocaleDateString()
        }`,

        14,

        23

    );



    autoTable(pdf, {


        startY: 30,


        head: [
            headers
        ],


        body: rows,


        styles: {

            fontSize: 8,

        },


    });



    pdf.save(

        `membres-selection-${Date.now()}.pdf`

    );

}   