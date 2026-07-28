import type {
    ColumnDef,
} from "@tanstack/react-table";

interface Props<TData> {

    render(row: TData): React.ReactNode;

}

export function actionColumn<TData>(

    props: Props<TData>,

): ColumnDef<TData> {

    return {

        id: "actions",

        enableSorting: false,

        enableHiding: false,

        cell: ({ row }) =>

            props.render(

                row.original

            ),

    };

}