import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import MemberActions from "./MemberActions";
import type { Profile } from "@/types";

type Props = {
    members: Profile[];
    onView(member: Profile): void;
    onEdit(member: Profile): void;
    onDeactivate(member: Profile): void;
    onReactivate(member: Profile): void;
};

export default function MemberTable({
    members,
    onView,
    onEdit,
    onDeactivate,
    onReactivate,
}: Props) {
    return (
        <div className="rounded-lg border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Pupitre</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">

                            Actions

                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>{member.nom}</TableCell>

                            <TableCell>
                                {member.prenom}
                            </TableCell>

                            <TableCell>

                                <Badge variant="outline">

                                    {member.voice_part}

                                </Badge>

                            </TableCell>

                            <TableCell>

                                {member.status === "active" && (

                                    <Badge>
                                        Actif
                                    </Badge>

                                )}

                                {member.status === "pending" && (

                                    <Badge variant="secondary">
                                        En attente
                                    </Badge>

                                )}

                                {member.status === "rejected" && (

                                    <Badge variant="destructive">
                                        Refusé
                                    </Badge>

                                )}

                                {member.status === "inactive" && (

                                    <Badge variant="outline">

                                        Désactivé

                                    </Badge>

                                )}

                            </TableCell>
                            <TableCell className="text-right">

                                <MemberActions
                                    member={member}
                                    onView={onView}
                                    onEdit={onEdit}
                                    onDeactivate={onDeactivate}
                                    onReactivate={onReactivate}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}