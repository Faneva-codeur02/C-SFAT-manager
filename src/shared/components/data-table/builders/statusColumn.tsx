import type {
    ColumnDef,
} from "@tanstack/react-table";

import ContributionStatusBadge from "@/features/contributions/components/ContributionStatusBadge";

import DataTableColumnHeader from "../DataTableColumnHeader";

export function statusColumn<TData>(

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

        cell: ({ getValue }) => (

            <ContributionStatusBadge

                status={

                    getValue() as never

                }

            />

        ),

    };

}