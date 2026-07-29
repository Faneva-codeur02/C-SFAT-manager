import {
    MoreHorizontal,
} from "lucide-react";

import {

    DropdownMenu,

    DropdownMenuContent,

    DropdownMenuItem,

    DropdownMenuTrigger,

} from "@/shared/components/ui/dropdown-menu";

import { buttonVariants } from "@/shared/components/ui/button";

import type {

    DataTableRowAction,

} from "./types";

interface Props<T> {

    row: T;

    actions: DataTableRowAction<T>[];

}

export default function DataTableRowActions<T>({

    row,

    actions,

}: Props<T>) {

    return (

        <DropdownMenu>

            <DropdownMenuTrigger

                className={buttonVariants({

                    variant: "ghost",

                    size: "icon",

                })}

            >

                <MoreHorizontal size={18} />

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                {

                    actions.map((action) => {

                        const Icon = action.icon;

                        return (

                            <DropdownMenuItem

                                key={action.label}

                                disabled={action.disabled}

                                className={

                                    action.destructive

                                        ? "text-red-600"

                                        : ""

                                }

                                onClick={() =>

                                    action.onClick(row)

                                }

                            >

                                <Icon

                                    className="mr-2 h-4 w-4"

                                />

                                {action.label}

                            </DropdownMenuItem>

                        );

                    })

                }

            </DropdownMenuContent>

        </DropdownMenu>

    );

}