import {
    RotateCcw,
} from "lucide-react";

import type {
    Table,
} from "@tanstack/react-table";

import { Button } from "@/shared/components/ui/button";

import DataTableSearch from "./DataTableSearch";
import DataTableViewOptions from "./DataTableViewOptions";

interface Props<TData> {

    table: Table<TData>;

    globalFilter: string;

    setGlobalFilter: (value: string) => void;

}

export default function DataTableToolbar<TData>({

    table,

    globalFilter,

    setGlobalFilter,

}: Props<TData>) {

    const hasFilters =

        globalFilter.length > 0;

    function reset() {

        setGlobalFilter("");

        table.resetColumnFilters();

        table.resetSorting();

    }

    return (

        <div
            className="
                flex
                flex-col
                gap-3
                pb-4

                sm:flex-row
                sm:items-center
                sm:justify-between
            "
        >

            {/* Recherche */}

            <DataTableSearch

                value={globalFilter}

                onChange={setGlobalFilter}

            />

            {/* Actions */}

            <div className="flex items-center gap-2">

                <DataTableViewOptions

                    table={table}

                />

                {

                    hasFilters && (

                        <Button

                            variant="outline"

                            size="sm"

                            onClick={reset}

                        >

                            <RotateCcw
                                className="
                                    mr-2
                                    h-4
                                    w-4
                                "
                            />

                            Réinitialiser

                        </Button>

                    )

                }

            </div>

        </div>

    );

}