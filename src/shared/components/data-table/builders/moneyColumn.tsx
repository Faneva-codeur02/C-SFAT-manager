import type {
    ColumnDef,
} from "@tanstack/react-table";

import DataTableColumnHeader from "../DataTableColumnHeader";

export function moneyColumn<TData>(

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

        cell: ({ getValue }) => {

            const value = Number(

                getValue()

            );

            return new Intl.NumberFormat(

                "fr-FR"

            ).format(value)

                + " Ar";

        },

    };

}