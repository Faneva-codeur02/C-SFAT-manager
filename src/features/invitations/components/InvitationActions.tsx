import {

    DropdownMenu,

    DropdownMenuContent,

    DropdownMenuItem,

    DropdownMenuTrigger,

} from "@/shared/components/ui/dropdown-menu";

import { Button, buttonVariants } from "@/shared/components/ui/button";

import {

    Copy,

    MoreHorizontal,

    Trash2,

} from "lucide-react";

import type {
    InvitationWithCreator,
} from "@/types";

interface Props {

    invitation: InvitationWithCreator;

    copied: boolean;

    onCopy(): void;

    onDelete(): void;

}

export default function InvitationActions({

    invitation,

    copied,

    onCopy,

    onDelete,

}: Props) {

    return (

        <DropdownMenu>

            <DropdownMenuTrigger
                className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                })}>



                <MoreHorizontal className="h-4 w-4" />

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem
                    onClick={onCopy}
                >

                    <Copy className="mr-2 h-4 w-4" />

                    {copied
                        ? "Copié"
                        : "Copier"}

                </DropdownMenuItem>

                <DropdownMenuItem

                    className="text-destructive"

                    onClick={onDelete}

                >

                    <Trash2 className="mr-2 h-4 w-4" />

                    Supprimer

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );

}