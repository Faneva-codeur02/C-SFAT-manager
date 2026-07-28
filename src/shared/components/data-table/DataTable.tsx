import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import type {
    ColumnDef,
    SortingState,
} from "@tanstack/react-table";

import {

    Table,

    TableBody,

    TableCell,

    TableHead,

    TableHeader,

    TableRow,

} from "@/shared/components/ui/table";
import { useState } from "react";
import DataTableSearch from "./DataTableSearch";
import DataTablePagination from "./DataTablePagination";
import DataTableToolbar from "./DataTableToolbar";

interface Props<TData, TValue> {

    columns: ColumnDef<TData, TValue>[];

    data: TData[];

}

export default function DataTable<

    TData,

    TValue,

>({

    columns,

    data,

}: Props<TData, TValue>) {

    const [sorting, setSorting] =
        useState<SortingState>([]);

    const [globalFilter, setGlobalFilter] =
        useState("");

    const table = useReactTable({

        data,

        columns,

        state: {

            sorting,

            globalFilter,

        },

        onSortingChange:

            setSorting,

        onGlobalFilterChange:

            setGlobalFilter,

        getCoreRowModel:

            getCoreRowModel(),

        getPaginationRowModel:

            getPaginationRowModel(),

        getSortedRowModel:

            getSortedRowModel(),

        getFilteredRowModel:

            getFilteredRowModel(),

    });

    return (

        <div className="rounded-xl border">
            <DataTableSearch

                value={globalFilter}

                onChange={setGlobalFilter}

            />
            <DataTableToolbar

                table={table}

                globalFilter={globalFilter}

                setGlobalFilter={setGlobalFilter}

            />

            <Table>

                <TableHeader>

                    {

                        table.getHeaderGroups().map(

                            headerGroup => (

                                <TableRow

                                    key={headerGroup.id}

                                >

                                    {

                                        headerGroup.headers.map(

                                            header => (

                                                <TableHead

                                                    key={header.id}

                                                >

                                                    {

                                                        header.isPlaceholder

                                                            ? null

                                                            : flexRender(

                                                                header.column.columnDef.header,

                                                                header.getContext()

                                                            )

                                                    }

                                                </TableHead>

                                            )

                                        )

                                    }

                                </TableRow>

                            )

                        )

                    }

                </TableHeader>

                <TableBody>

                    {

                        table

                            .getRowModel()

                            .rows

                            .length

                            ? (

                                table

                                    .getRowModel()

                                    .rows

                                    .map(row => (

                                        <TableRow

                                            key={row.id}

                                        >

                                            {

                                                row

                                                    .getVisibleCells()

                                                    .map(

                                                        cell => (

                                                            <TableCell

                                                                key={cell.id}

                                                            >

                                                                {

                                                                    flexRender(

                                                                        cell.column.columnDef.cell,

                                                                        cell.getContext()

                                                                    )

                                                                }

                                                            </TableCell>

                                                        )

                                                    )

                                            }

                                        </TableRow>

                                    ))

                            )

                            : (

                                <TableRow>

                                    <TableCell

                                        colSpan={columns.length}

                                        className="h-32 text-center"

                                    >

                                        Aucune donnée.

                                    </TableCell>

                                </TableRow>

                            )

                    }

                </TableBody>

            </Table>
            <DataTablePagination

                table={table}

            />

        </div>

    );

}