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
    onDeactivate(member: Profile): void;
    onReactivate(member: Profile): void;
    onArchive(member: Profile): void;
}

export default function MemberActions({
    member,
    onView,
    onEdit,
    onDeactivate,
    onReactivate,
    onArchive,
}: Props) {

    return (

        <DropdownMenu>

            <DropdownMenuTrigger>

                <Button
                    variant="ghost"
                    size="sm"
                >
                    <MoreHorizontal className="h-4 w-4" />
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

                {member.status === "active" && (

                    <DropdownMenuItem
                        onClick={() => onDeactivate(member)}
                    >
                        Désactiver
                    </DropdownMenuItem>

                )}

                {member.status === "inactive" && (

                    <DropdownMenuItem
                        onClick={() => onReactivate(member)}
                    >
                        Réactiver
                    </DropdownMenuItem>

                )}

                <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onArchive(member)}
                >
                    Archiver
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );

}