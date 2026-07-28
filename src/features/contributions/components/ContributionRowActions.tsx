import {

    MoreHorizontal,

    CreditCard,

    Eye,

    Pencil,

    Trash2,

} from "lucide-react";

import {

    DropdownMenu,

    DropdownMenuContent,

    DropdownMenuItem,

    DropdownMenuTrigger,

} from "@/shared/components/ui/dropdown-menu";

import { buttonVariants } from "@/shared/components/ui/button";

import type {
    ContributionRow,
} from "../types/contribution-row";

interface Props {

    contribution: ContributionRow;

    onView?(contribution: ContributionRow): void;

    onPay?(contribution: ContributionRow): void;

    onEdit?(contribution: ContributionRow): void;

    onDelete?(contribution: ContributionRow): void;

}

export default function ContributionRowActions({

    contribution,

    onView,

    onPay,

    onEdit,

    onDelete,

}: Props) {

    return (

        <DropdownMenu>

            <DropdownMenuTrigger className={buttonVariants({
                variant: "ghost",
                size: "icon",
            })}>

                <MoreHorizontal size={18} />



            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem onClick={() =>

                    onView?.(contribution)

                }>

                    <Eye className="mr-2 h-4 w-4" />

                    Voir

                </DropdownMenuItem>

                <DropdownMenuItem onClick={() =>

                    onPay?.(contribution)

                }>

                    <CreditCard className="mr-2 h-4 w-4" />

                    Paiement

                </DropdownMenuItem>

                <DropdownMenuItem onClick={() =>

                    onEdit?.(contribution)

                }>

                    <Pencil className="mr-2 h-4 w-4" />

                    Modifier

                </DropdownMenuItem>

                <DropdownMenuItem

                    className="text-red-600"

                    onClick={() =>

                        onDelete?.(contribution)

                    }

                >

                    <Trash2 className="mr-2 h-4 w-4" />

                    Supprimer

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );

}