import { MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import type { Profile } from "@/types";

interface Props {

    member: Profile;
    onView(member: Profile): void;
    onEdit(member: Profile): void;

}

export default function MemberActions({
    member,
    onView,
    onEdit
}: Props) {

    return (

        <DropdownMenu>

            <DropdownMenuTrigger>

                <Button
                    variant="ghost"
                    size="icon"
                >
                    <MoreHorizontal className="h-5 w-5" />
                </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem
                    onClick={() => onView(member)}
                >

                    Voir le profil

                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onEdit(member)}
                >

                    Modifier

                </DropdownMenuItem>

                <DropdownMenuItem>

                    Désactiver

                </DropdownMenuItem>

                <DropdownMenuItem className="text-red-600">

                    Supprimer

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );

}