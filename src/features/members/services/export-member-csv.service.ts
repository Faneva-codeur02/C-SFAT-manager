import {
    getAllMembersForExport
} from "./export-member.service";


import type {
    MemberFilters
} from "../types/member-filter";


import type {
    MemberColumnKey
} from "../types/member-column";


import {
    memberColumns
} from "../config/member-columns";



export async function exportMembersToCSV(

    filters: MemberFilters,

    visibleColumns: MemberColumnKey[],

) {



    const members =
        await getAllMembersForExport(
            filters
        );



    const columns =
        memberColumns.filter(
            column =>
                visibleColumns.includes(
                    column.key
                )
        );



    const headers =
        columns.map(
            c => c.label
        );



    const rows =
        members.map(member => {


            return columns.map(column => {


                switch (column.key) {


                    case "nom":
                        return member.nom;


                    case "prenom":
                        return member.prenom;


                    case "email":
                        return member.email;


                    case "voicePart":
                        return member.voice_part ?? "";


                    case "status":
                        return member.status;


                    case "createdAt":
                        return new Date(
                            member.created_at
                        )
                            .toLocaleDateString();



                    default:
                        return "";

                }



            });


        });



    const csv = [

        headers,

        ...rows

    ]

        .map(row =>

            row.map(value =>

                `"${String(value)
                    .replace(/"/g, '""')}"`

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
                    "text/csv;charset=utf-8"
            }

        );



    const url =
        URL.createObjectURL(blob);



    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "membres-export.csv";



    link.click();


    URL.revokeObjectURL(url);


}