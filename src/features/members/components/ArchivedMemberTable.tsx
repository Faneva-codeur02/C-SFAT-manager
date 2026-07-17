import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { Badge } from "@/shared/components/ui/badge";
import type { Profile } from "@/types";
import ArchivedMemberActions from "./ArchivedMemberActions";


interface Props {

    members: Profile[];

    onRestore(member: Profile): void;

    onDelete(member: Profile): void;

}

export default function ArchivedMemberTable({

    members,

    onRestore,

    onDelete,

}: Props) {

    return (

        <div className="rounded-lg border bg-card">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>

                            Nom

                        </TableHead>

                        <TableHead>

                            Prénom

                        </TableHead>

                        <TableHead>

                            Pupitre

                        </TableHead>

                        <TableHead>

                            Date archivage

                        </TableHead>

                        <TableHead className="text-right">

                            Actions

                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {

                        members.map(member => (


                            <TableRow key={member.id}>

                                <TableCell>

                                    {member.nom}

                                </TableCell>

                                <TableCell>

                                    {member.prenom}

                                </TableCell>

                                <TableCell>

                                    <Badge variant="outline">

                                        {member.voice_part}

                                    </Badge>

                                </TableCell>

                                <TableCell>

                                    {

                                        member.deleted_at

                                            ? new Date(
                                                member.deleted_at
                                            ).toLocaleDateString("fr-FR")

                                            : "-"

                                    }

                                </TableCell>

                                <TableCell className="text-right">

                                    <ArchivedMemberActions

                                        member={member}

                                        onRestore={onRestore}

                                        onDelete={onDelete}

                                    />

                                </TableCell>

                            </TableRow>

                        ))

                    }

                </TableBody>

            </Table>

        </div>

    );

}