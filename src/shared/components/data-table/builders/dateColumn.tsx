import type {
    ColumnDef,
} from "@tanstack/react-table";

import DataTableColumnHeader from "../DataTableColumnHeader";

export function dateColumn<TData>(

    accessorKey: keyof TData & string,

    title: string,

): ColumnDef<TData> {

    return {

        accessorKey,

        meta: {

            title,

        },

        header: ({ column }) => (

            <DataTableColumnHeader

                column={column}

                title={title}

            />

        ),

        cell: ({ getValue }) =>

            new Date(

                String(

                    getValue()

                )

            ).toLocaleDateString(

                "fr-FR"

            ),

    };

}