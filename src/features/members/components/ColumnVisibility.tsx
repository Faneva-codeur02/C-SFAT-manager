import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import {
    buttonVariants,
} from "@/shared/components/ui/button";


import {
    Settings2,
} from "lucide-react";


import {
    memberColumns,
} from "../config/member-columns";


import type {
    MemberColumnKey,
} from "../types/member-column";


interface Props {

    visibleColumns:
    MemberColumnKey[];

    toggleColumn(
        column: MemberColumnKey
    ): void;

}


export default function ColumnVisibility({

    visibleColumns,

    toggleColumn,

}: Props) {


    return (

        <DropdownMenu>


            <DropdownMenuTrigger className={buttonVariants({
                variant: "outline",
            })}

            >

                <Settings2
                    className="mr-2 h-4 w-4"
                />

                Colonnes

            </DropdownMenuTrigger>


            <DropdownMenuContent
                align="end"
            >


                {
                    memberColumns.map(column => (

                        <DropdownMenuCheckboxItem

                            key={column.key}

                            checked={
                                visibleColumns.includes(
                                    column.key
                                )
                            }

                            onCheckedChange={() =>


                                toggleColumn(
                                    column.key
                                )


                            }

                        >

                            {column.label}

                        </DropdownMenuCheckboxItem>


                    ))

                }


            </DropdownMenuContent>


        </DropdownMenu>


    );

}