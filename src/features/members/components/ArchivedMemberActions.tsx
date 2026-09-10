import {

    RotateCcw,

    Trash2,

    MoreHorizontal,

} from "lucide-react";

import {

    DropdownMenu,

    DropdownMenuContent,

    DropdownMenuItem,

    DropdownMenuTrigger,

} from "@/shared/components/ui/dropdown-menu";

import { buttonVariants } from "@/shared/components/ui/button";

import { usePermission } from "@/features/auth/hooks/usePermission";
import { PERMISSIONS } from "@/auth/permissions";

import type { Profile } from "@/types";

interface Props {

    member: Profile;

    onRestore(member: Profile): void;

    onDelete(member: Profile): void;

}

export default function ArchivedMemberActions({

    member,

    onRestore,

    onDelete,

}: Props) {

    const { can } = usePermission();

    const canRestore = can(PERMISSIONS.MEMBERS_RESTORE);

    const canDelete = can(PERMISSIONS.MEMBERS_DELETE);

    if (!canRestore && !canDelete) {

        return null;

    }

    return (

        <DropdownMenu>

            <DropdownMenuTrigger className={buttonVariants({
                variant: "ghost",
                size: "icon",
            })}>

                <MoreHorizontal className="h-4 w-4" />

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                {canRestore && (

                    <DropdownMenuItem

                        onClick={() => onRestore(member)}

                    >

                        <RotateCcw className="mr-2 h-4 w-4" />

                        Restaurer

                    </DropdownMenuItem>

                )}

                {canDelete && (

                    <DropdownMenuItem

                        className="text-red-600"

                        onClick={() => onDelete(member)}

                    >

                        <Trash2 className="mr-2 h-4 w-4" />

                        Supprimer définitivement

                    </DropdownMenuItem>

                )}

            </DropdownMenuContent>

        </DropdownMenu>

    );

}