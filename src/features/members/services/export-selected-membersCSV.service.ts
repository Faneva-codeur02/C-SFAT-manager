import { supabase } from "@/shared/lib/supabase";

import type { MemberColumnKey } from "../types/member-column";


export async function exportSelectedMembersCSV(

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



    const headers =
        visibleColumns.map(column => {


            const labels: Record<string, string> = {

                nom: "Nom",

                prenom: "Prénom",

                email: "Email",

                voice_part: "Pupitre",

                status: "Statut",

                created_at: "Date inscription",

            };


            return labels[column] ?? column;


        });



    const rows =

        members.map(member =>


            visibleColumns.map(column =>

                member[column] ?? ""

            )


        );



    const csv = [

        headers,

        ...rows

    ]

        .map(row =>

            row.map(value =>

                `"${String(value)
                    .replace(/"/g, '""')
                }"`

            )

                .join(",")

        )

        .join("\n");



    const blob =
        new Blob(

            [
                "\ufeff" + csv
            ],

            {
                type:
                    "text/csv;charset=utf-8;"
            }

        );



    const url =
        URL.createObjectURL(blob);



    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        `membres-selection-${Date.now()}.csv`;



    link.click();



    URL.revokeObjectURL(url);


}