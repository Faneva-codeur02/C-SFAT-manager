import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import type {
    Table,
} from "@tanstack/react-table";

import { Button } from "@/shared/components/ui/button";

interface Props<TData> {

    table: Table<TData>;

}

export default function DataTablePagination<TData>({

    table,

}: Props<TData>) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                border-t
                px-4
                py-3
            "
        >

            <p className="text-sm text-muted-foreground">

                Page

                {" "}

                {table.getState().pagination.pageIndex + 1}

                {" / "}

                {table.getPageCount()}

            </p>

            <div className="flex gap-2">

                <Button

                    variant="outline"

                    size="icon"

                    disabled={

                        !table.getCanPreviousPage()

                    }

                    onClick={() =>

                        table.previousPage()

                    }

                >

                    <ChevronLeft size={18} />

                </Button>

                <Button

                    variant="outline"

                    size="icon"

                    disabled={

                        !table.getCanNextPage()

                    }

                    onClick={() =>

                        table.nextPage()

                    }

                >

                    <ChevronRight size={18} />

                </Button>

            </div>

        </div>

    );

}