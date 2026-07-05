import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { Badge } from "@/shared/components/ui/badge";

import { Button } from "@/shared/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type {
    InvitationWithCreator,
} from "@/types";

interface Props {

    codes: InvitationWithCreator[];

}

import { getInvitationStatus }
    from "../utils/getInvitationStatus";

export default function InvitationTable({
    codes,
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

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>Code</TableHead>

                    <TableHead>Statut</TableHead>

                    <TableHead>Créé le</TableHead>

                    <TableHead>Expire le</TableHead>

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

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        copyCode(
                                            code.id,
                                            code.code,
                                        )
                                    }
                                >

                                    {copiedId === code.id ? (

                                        <Check
                                            className="h-4 w-4 text-green-600"
                                        />

                                    ) : (

                                        <Copy
                                            className="h-4 w-4"
                                        />

                                    )}

                                </Button>

                            </TableCell>

                        </TableRow>

                    );

                })}

            </TableBody>

        </Table>

    );

}