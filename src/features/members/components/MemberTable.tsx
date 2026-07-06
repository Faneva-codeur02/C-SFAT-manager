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
import {
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
} from "lucide-react";

import type { MemberSort } from "../types/member-filter";
import { Checkbox } from "@/shared/components/ui/checkbox";

type Props = {

    members: Profile[];

    sortBy: MemberSort;

    order: "asc" | "desc";

    onSort(column: MemberSort): void;

    onView(member: Profile): void;

    onEdit(member: Profile): void;

    onDeactivate(member: Profile): void;

    onReactivate(member: Profile): void;

    selectedIds: string[];

    onToggle(id: string): void;

    onToggleAll(): void;

};

export default function MemberTable({
    members,
    sortBy,
    order,
    onSort,
    onView,
    onEdit,
    onDeactivate,
    onReactivate,
    selectedIds,
    onToggle,
    onToggleAll,
}: Props) {
    function renderSortIcon(column: MemberSort) {

        if (sortBy !== column) {

            return (
                <ArrowUpDown className="ml-2 h-4 w-4" />
            );

        }

        return order === "asc"

            ? <ArrowUp className="ml-2 h-4 w-4" />

            : <ArrowDown className="ml-2 h-4 w-4" />;

    }
    return (
        <div className="rounded-lg border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">

                            <Checkbox

                                checked={
                                    selectedIds.length === members.length &&
                                    members.length > 0
                                }

                                onCheckedChange={onToggleAll}

                            />

                        </TableHead>
                        <TableHead>
                            <button
                                onClick={() => onSort("name")}
                                className="flex items-center font-semibold"
                            >
                                Nom
                                {renderSortIcon("name")}
                            </button>
                        </TableHead>
                        <TableHead>

                            <button
                                className="flex items-center font-semibold"
                                onClick={() => onSort("firstname")}
                            >

                                Prénom

                                {renderSortIcon("firstname")}

                            </button>

                        </TableHead>
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

                            <TableCell>

                                <Checkbox

                                    checked={selectedIds.includes(member.id)}

                                    onCheckedChange={() =>
                                        onToggle(member.id)
                                    }

                                />

                            </TableCell>
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