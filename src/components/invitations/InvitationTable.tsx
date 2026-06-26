import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

interface Props {
    codes: any[];
}

export default function InvitationTable({
    codes,
}: Props) {

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>Code</TableHead>

                    <TableHead>Statut</TableHead>

                    <TableHead>Expiration</TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {codes.map((code) => (

                    <TableRow key={code.id}>

                        <TableCell>

                            {code.code}

                        </TableCell>

                        <TableCell>

                            {code.is_used ? (

                                <Badge>

                                    Utilisé

                                </Badge>

                            ) : (

                                <Badge variant="secondary">

                                    Disponible

                                </Badge>

                            )}

                        </TableCell>

                        <TableCell>

                            {new Date(
                                code.expires_at
                            ).toLocaleDateString()}

                        </TableCell>

                    </TableRow>

                ))}

            </TableBody>

        </Table>

    );

}