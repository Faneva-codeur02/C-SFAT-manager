import type {
    ColumnDef,
} from "@tanstack/react-table";

import DataTableColumnHeader from "../DataTableColumnHeader";

export function textColumn<TData>(

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

    };

}