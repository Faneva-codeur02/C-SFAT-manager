import {
    useEffect,
    useState,
} from "react";

import {
    memberColumns,
} from "../config/member-columns";

import type {
    MemberColumnKey,
} from "../types/member-column";


const STORAGE_KEY =
    "members-visible-columns";


export function useMemberColumns() {


    const [visibleColumns, setVisibleColumns] =
        useState<MemberColumnKey[]>(() => {


            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (saved) {

                return JSON.parse(saved);

            }


            return memberColumns

                .filter(
                    column =>
                        column.defaultVisible
                )

                .map(
                    column =>
                        column.key
                );

        });



    useEffect(() => {


        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(
                visibleColumns
            )

        );


    }, [
        visibleColumns
    ]);



    function toggleColumn(
        column: MemberColumnKey
    ) {


        setVisibleColumns(
            current => {


                if (
                    current.includes(column)
                ) {

                    return current.filter(
                        item =>
                            item !== column
                    );

                }


                return [
                    ...current,
                    column
                ];

            }
        );

    }



    return {

        visibleColumns,

        toggleColumn,

    };

}