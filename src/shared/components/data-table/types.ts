import type {
    RowData,
} from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";

declare module "@tanstack/react-table" {

    interface ColumnMeta<
        TData extends RowData,
        TValue,
    > {

        title?: string;

    }

}

export interface DataTableRowAction<T> {

    label: string;

    icon: LucideIcon;

    onClick(row: T): void;

    destructive?: boolean;

    disabled?: boolean;

}