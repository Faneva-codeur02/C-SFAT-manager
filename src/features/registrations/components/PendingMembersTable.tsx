import type { Profile } from "@/types";
import { Button } from "@/shared/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { Badge } from "@/shared/components/ui/badge";

import { Eye } from "lucide-react";

interface Props {
    members: Profile[];
    onView(member: Profile): void;
}

export default function PendingMembersTable({
    members,
    onView,
}: Props) {
    return (

        <div className="rounded-xl border bg-card shadow-sm">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Nom</TableHead>

                        <TableHead>Email</TableHead>

                        <TableHead>Téléphone</TableHead>

                        <TableHead>Date</TableHead>

                        <TableHead>Statut</TableHead>

                        <TableHead className="text-right">
                            Action
                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {members.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={6}
                                className="py-10 text-center text-muted-foreground"
                            >

                                Aucune inscription en attente.

                            </TableCell>

                        </TableRow>

                    ) : (

                        members.map((member) => (

                            <TableRow key={member.id}>

                                <TableCell className="font-medium">

                                    {member.nom} {member.prenom}

                                </TableCell>

                                <TableCell>

                                    {member.email}

                                </TableCell>

                                <TableCell>

                                    {member.telephone ?? "-"}

                                </TableCell>

                                <TableCell>

                                    {new Date(
                                        member.created_at
                                    ).toLocaleDateString("fr-FR")}

                                </TableCell>

                                <TableCell>

                                    <Badge
                                        variant="secondary"
                                    >
                                        En attente
                                    </Badge>

                                </TableCell>

                                <TableCell className="text-right">

                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            onView(member)
                                        }
                                    >

                                        <Eye
                                            className="mr-2 h-4 w-4"
                                        />

                                        Examiner

                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))

                    )}

                </TableBody>

            </Table>

        </div>

    );
}