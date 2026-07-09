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
import type {
    MemberColumnKey,
} from "../types/member-column";

type Props = {

    members: Profile[];

    archiveMode?: boolean;

    sortBy: MemberSort;

    visibleColumns: MemberColumnKey[];

    order: "asc" | "desc";

    onSort(column: MemberSort): void;

    onView(member: Profile): void;

    onEdit(member: Profile): void;

    onDeactivate(member: Profile): void;

    onReactivate(member: Profile): void;

    selectedIds: string[];

    onToggle(id: string): void;

    onToggleAll(): void;

    onArchive(member: Profile): void;

};

export default function MemberTable({
    members,
    sortBy,
    visibleColumns,
    order,
    onSort,
    onView,
    onEdit,
    onDeactivate,
    onReactivate,
    selectedIds,
    onToggle,
    onToggleAll,
    onArchive,
}: Props) {
    function renderSortIcon(
        column: MemberSort
    ) {

        if (sortBy !== column) {

            return (
                <ArrowUpDown
                    className="
                    ml-2
                    h-4
                    w-4
                    text-muted-foreground
                "
                />
            );

        }


        if (order === "asc") {

            return (
                <ArrowUp
                    className="
                    ml-2
                    h-4
                    w-4
                    text-primary
                "
                />
            );

        }


        return (

            <ArrowDown

                className="
                ml-2
                h-4
                w-4
                text-primary
            "

            />

        );

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
                        {
                            visibleColumns.includes("nom") && (

                                <TableHead>

                                    <button

                                        onClick={() => onSort("name")}

                                        className="
                                            flex
                                            items-center
                                            font-semibold
                                        "

                                    >

                                        Nom

                                        {renderSortIcon("name")}

                                    </button>

                                </TableHead>

                            )
                        }
                        {
                            visibleColumns.includes("prenom") && (

                                <TableHead>

                                    <button

                                        onClick={() =>
                                            onSort("firstname")
                                        }

                                        className="
                                            flex
                                            items-center
                                            font-semibold
                                        "

                                    >

                                        Prénom

                                        {renderSortIcon("firstname")}

                                    </button>

                                </TableHead>

                            )
                        }
                        {
                            visibleColumns.includes("email") && (

                                <TableHead>
                                    Email
                                </TableHead>

                            )
                        }
                        {
                            visibleColumns.includes("voicePart") && (

                                <TableHead>

                                    <button

                                        onClick={() =>
                                            onSort("voicePart")
                                        }

                                        className="
                                            flex
                                            items-center
                                            font-semibold
                                            "

                                    >

                                        Pupitre

                                        {renderSortIcon("voicePart")}

                                    </button>

                                </TableHead>

                            )
                        }

                        {
                            visibleColumns.includes("createdAt") && (

                                <TableHead>

                                    Date inscription

                                </TableHead>

                            )
                        }
                        {
                            visibleColumns.includes("status") && (

                                <TableHead>
                                    Statut
                                </TableHead>

                            )
                        }
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
                            {
                                visibleColumns.includes("nom") && (

                                    <TableCell>
                                        {member.nom}
                                    </TableCell>

                                )
                            }

                            {
                                visibleColumns.includes("prenom") && (

                                    <TableCell>

                                        {member.prenom}

                                    </TableCell>

                                )
                            }
                            {
                                visibleColumns.includes("email") && (

                                    <TableCell>

                                        {member.email}

                                    </TableCell>

                                )
                            }

                            {
                                visibleColumns.includes("voicePart") && (

                                    <TableCell>

                                        <Badge variant="outline">

                                            {member.voice_part}

                                        </Badge>

                                    </TableCell>

                                )
                            }
                            {
                                visibleColumns.includes("createdAt") && (

                                    <TableCell>

                                        {
                                            new Date(
                                                member.created_at
                                            )
                                                .toLocaleDateString("fr-FR")
                                        }

                                    </TableCell>

                                )
                            }
                            {
                                visibleColumns.includes("status") && (
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

                                )
                            }
                            <TableCell className="text-right">

                                <MemberActions
                                    member={member}
                                    onView={onView}
                                    onEdit={onEdit}
                                    onDeactivate={onDeactivate}
                                    onReactivate={onReactivate}
                                    onArchive={onArchive}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}