import {
    Settings2,
} from "lucide-react";

import type {
    Table,
} from "@tanstack/react-table";

import {

    DropdownMenu,

    DropdownMenuCheckboxItem,

    DropdownMenuContent,

    DropdownMenuTrigger,

} from "@/shared/components/ui/dropdown-menu";

import { buttonVariants } from "@/shared/components/ui/button";

interface Props<TData> {

    table: Table<TData>;

}

export default function DataTableViewOptions<TData>({

    table,

}: Props<TData>) {

    const columns =

        table

            .getAllColumns()

            .filter(

                column =>

                    column.getCanHide()

            );

    return (

        <DropdownMenu>

            <DropdownMenuTrigger className={buttonVariants({
                variant: "outline",
                size: "sm",
            })}>

                <Settings2
                    className="
                            mr-2
                            h-4
                            w-4
                        "
                />

                Colonnes

            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
            >

                {

                    columns.map(column => (

                        <DropdownMenuCheckboxItem

                            key={column.columnDef.meta?.title ?? column.id}

                            checked={

                                column.getIsVisible()

                            }

                            onCheckedChange={(value) =>

                                column.toggleVisibility(

                                    !!value

                                )

                            }

                        >

                            {column.columnDef.meta?.title ?? column.id}

                        </DropdownMenuCheckboxItem>

                    ))

                }

            </DropdownMenuContent>

        </DropdownMenu>

    );

}