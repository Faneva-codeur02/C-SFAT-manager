import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
} from "lucide-react";

import type {
    Column,
} from "@tanstack/react-table";

import { Button } from "@/shared/components/ui/button";

interface Props<TData, TValue> {

    column: Column<TData, TValue>;

    title: string;

}

export default function DataTableColumnHeader<
    TData,
    TValue,
>({
    column,
    title,
}: Props<TData, TValue>) {

    if (!column.getCanSort()) {

        return title;

    }

    const sorted = column.getIsSorted();

    return (

        <Button

            variant="ghost"

            className="h-8 px-2"

            onClick={() =>

                column.toggleSorting(

                    sorted === "asc"

                )

            }

        >

            <span>{title}</span>

            {

                sorted === "asc"

                    ? <ArrowUp className="ml-2 h-4 w-4" />

                    : sorted === "desc"

                        ? <ArrowDown className="ml-2 h-4 w-4" />

                        : <ArrowUpDown className="ml-2 h-4 w-4 opacity-40" />

            }

        </Button>

    );

}