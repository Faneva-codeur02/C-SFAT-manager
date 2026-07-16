import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { Badge } from "@/shared/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import type {
    InvitationWithCreator,
} from "@/types";

import type {
    InvitationSort,
} from "../types/invitation-filter";

interface Props {

    codes: InvitationWithCreator[];

    sortBy: InvitationSort;

    order: "asc" | "desc";

    onSort(
        column: InvitationSort
    ): void;

    onDelete(
        invitation: InvitationWithCreator
    ): void;

    selectedIds: string[];

    onToggle(
        id: string
    ): void;

    onToggleAll(
        ids: string[]
    ): void;

}

import { getInvitationStatus }
    from "../utils/getInvitationStatus";
import InvitationActions from "./InvitationActions";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/shared/components/ui/checkbox";

export default function InvitationTable({
    codes,
    sortBy,
    order,
    onSort,
    onDelete,
    selectedIds,
    onToggle,
    onToggleAll,
}: Props) {


    const [copiedId, setCopiedId] =
        useState<string | null>(null);

    async function copyCode(
        id: string,
        code: string,
    ) {

        try {

            await navigator.clipboard.writeText(code);

            setCopiedId(id);

            toast.success(
                "Code copié."
            );

            setTimeout(() => {

                setCopiedId(null);

            }, 2000);

        } catch {

            toast.error(
                "Impossible de copier le code."
            );

        }

    }

    function renderSortIcon(
        column: InvitationSort
    ) {

        if (sortBy !== column) {

            return (
                <ArrowUpDown
                    className="ml-2 h-4 w-4"
                />
            );

        }

        return order === "asc"

            ? <ArrowUp className="ml-2 h-4 w-4" />

            : <ArrowDown className="ml-2 h-4 w-4" />;

    }

    return (

        <Table>

            <TableHeader>

                <TableRow>
                    <TableHead className="w-10">

                        <Checkbox

                            checked={

                                codes.length > 0 &&
                                selectedIds.length === codes.length

                            }

                            onCheckedChange={() =>

                                onToggleAll(

                                    codes.map(code => code.id)

                                )

                            }

                        />

                    </TableHead>

                    <TableHead>

                        <button

                            className="flex items-center"

                            onClick={() =>

                                onSort("code")

                            }

                        >

                            Code

                            {renderSortIcon("code")}

                        </button>

                    </TableHead>

                    <TableHead>

                        Status

                    </TableHead>

                    <TableHead>

                        <button

                            className="flex items-center"

                            onClick={() =>

                                onSort("createdAt")

                            }

                        >

                            Créé le

                            {renderSortIcon("createdAt")}

                        </button>

                    </TableHead>

                    <TableHead>
                        <button

                            className="flex items-center"

                            onClick={() =>

                                onSort("expiresAt")

                            }

                        >

                            Expire le

                            {renderSortIcon("expiresAt")}

                        </button>

                    </TableHead>

                    <TableHead>Créé par</TableHead>

                    <TableHead className="text-center">
                        Actions
                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {codes.map((code) => {

                    const status =
                        getInvitationStatus(code);

                    return (

                        <TableRow key={code.id}>

                            <TableCell>

                                <Checkbox

                                    checked={

                                        selectedIds.includes(code.id)

                                    }

                                    onCheckedChange={() =>

                                        onToggle(code.id)

                                    }

                                />

                            </TableCell>

                            <TableCell>

                                <code
                                    className=" rounded-md bg-muted px-2 py-1 font-mono text-sm "
                                >
                                    {code.code}
                                </code>

                            </TableCell>

                            <TableCell>

                                <Badge
                                    variant={status.variant}
                                >

                                    {status.label}

                                </Badge>

                            </TableCell>

                            <TableCell>

                                {new Date(
                                    code.created_at
                                ).toLocaleDateString("fr-FR")}

                            </TableCell>

                            <TableCell>

                                {new Date(
                                    code.expires_at
                                ).toLocaleDateString("fr-FR")}

                            </TableCell>

                            <TableCell>
                                {(() => {
                                    const creator = Array.isArray(code.creator)
                                        ? code.creator[0]
                                        : code.creator;

                                    return creator
                                        ? `${creator.prenom} ${creator.nom}`
                                        : "-";
                                })()}
                            </TableCell>

                            <TableCell className="text-center">

                                <InvitationActions

                                    invitation={code}

                                    copied={
                                        copiedId === code.id
                                    }

                                    onCopy={() =>

                                        copyCode(
                                            code.id,
                                            code.code,
                                        )

                                    }

                                    onDelete={() =>

                                        onDelete(code)

                                    }

                                />

                            </TableCell>

                        </TableRow>

                    );

                })}

            </TableBody>

        </Table>

    );

}