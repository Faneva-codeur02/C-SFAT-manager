import * as XLSX from "xlsx";

import type { Profile } from "@/types";

import type {
    MemberColumnKey,
} from "../types/member-column";


import {
    memberColumns,
} from "../config/member-columns";



export function exportMembersToExcel(

    members: Profile[],

    visibleColumns: MemberColumnKey[],

) {


    const headers =
        memberColumns

            .filter(column =>
                visibleColumns.includes(column.key)
            )

            .reduce(
                (acc, column) => {

                    acc[column.key] =
                        column.label;

                    return acc;

                },
                {} as Record<string, string>
            );



    const rows =
        members.map(member => {


            const row: any = {};


            visibleColumns.forEach(column => {


                switch (column) {


                    case "nom":

                        row[column] =
                            member.nom;

                        break;



                    case "prenom":

                        row[column] =
                            member.prenom;

                        break;



                    case "email":

                        row[column] =
                            member.email;

                        break;



                    case "voicePart":

                        row[column] =
                            member.voice_part;

                        break;



                    case "status":

                        row[column] =
                            member.status;

                        break;



                    case "createdAt":

                        row[column] =
                            new Date(
                                member.created_at
                            )
                                .toLocaleDateString();

                        break;


                }


            });


            return row;


        });



    const worksheet =
        XLSX.utils.json_to_sheet(
            rows,
            {
                header:
                    Object.keys(headers)
            }
        );



    XLSX.utils.sheet_add_aoa(

        worksheet,

        [
            Object.values(headers)
        ],

        {
            origin: "A1"
        }

    );



    const workbook =
        XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Membres"

    );



    XLSX.writeFile(

        workbook,

        `membres-${Date.now()}.xlsx`

    );

}