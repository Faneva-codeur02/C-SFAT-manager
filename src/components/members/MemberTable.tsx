import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Props = {
    members: any[];
};

export default function MemberTable({
    members,
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
                                {member.pupitre}
                            </TableCell>

                            <TableCell>
                                {member.statut}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}