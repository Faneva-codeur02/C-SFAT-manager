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
import { Eye, Pencil, Trash2 } from "lucide-react";

import { usePermission } from "@/features/auth/hooks/usePermission";
import { PERMISSIONS } from "@/auth/permissions";

import { useUpdateEventStatus } from "../hooks/useUpdateEventStatus";
import type { Event } from "../types/event.types";

const typeLabels: Record<string, string> = {

    concert: "Concert",

    repetition: "Répétition",

    autre: "Autre",

};

type Props = {

    events: Event[];

    onChanged(): void;

    onView(event: Event): void;

    onEdit(event: Event): void;

    onDelete(event: Event): void;

};

export default function EventsTable({
    events,
    onChanged,
    onView,
    onEdit,
    onDelete,
}: Props) {

    const { can } = usePermission();

    const canEdit = can(PERMISSIONS.EVENTS_EDIT);

    const { changeStatus, updating } =
        useUpdateEventStatus();

    async function handleStatusChange(

        id: string,

        status: "completed" | "cancelled",

    ) {

        await changeStatus(id, status);

        onChanged();

    }

    return (

        <div className="rounded-lg border bg-card">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Date</TableHead>

                        <TableHead>Titre</TableHead>

                        <TableHead>Type</TableHead>

                        <TableHead>Lieu</TableHead>

                        <TableHead>Statut</TableHead>

                        <TableHead className="text-right">Actions</TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {events.map((event) => (

                        <TableRow key={event.id}>

                            <TableCell>

                                {new Date(event.event_date).toLocaleDateString("fr-FR")}

                            </TableCell>

                            <TableCell>{event.title}</TableCell>

                            <TableCell>{typeLabels[event.event_type]}</TableCell>

                            <TableCell>{event.location ?? "-"}</TableCell>

                            <TableCell>

                                {event.status === "planned" && <Badge variant="secondary">Prévu</Badge>}

                                {event.status === "completed" && <Badge>Terminé</Badge>}

                                {event.status === "cancelled" && <Badge variant="destructive">Annulé</Badge>}

                            </TableCell>

                            <TableCell className="text-right">

                                <div className="flex justify-end gap-1">

                                    <Button

                                        variant="ghost"

                                        size="icon"

                                        onClick={() => onView(event)}

                                    >

                                        <Eye className="h-4 w-4" />

                                    </Button>

                                    {canEdit && (

                                        <>

                                            <Button

                                                variant="ghost"

                                                size="icon"

                                                onClick={() => onEdit(event)}

                                            >

                                                <Pencil className="h-4 w-4" />

                                            </Button>

                                            <Button

                                                variant="ghost"

                                                size="icon"

                                                onClick={() => onDelete(event)}

                                            >

                                                <Trash2 className="h-4 w-4" />

                                            </Button>

                                        </>

                                    )}

                                </div>

                                {canEdit && event.status === "planned" && (

                                    <div className="flex justify-end gap-2 mt-1">

                                        <Button

                                            variant="outline"

                                            size="sm"

                                            disabled={updating}

                                            onClick={() => handleStatusChange(event.id, "completed")}

                                        >

                                            Terminer

                                        </Button>

                                        <Button

                                            variant="ghost"

                                            size="sm"

                                            disabled={updating}

                                            onClick={() => handleStatusChange(event.id, "cancelled")}

                                        >

                                            Annuler

                                        </Button>

                                    </div>

                                )}

                            </TableCell>

                        </TableRow>

                    ))}

                    {events.length === 0 && (

                        <TableRow>

                            <TableCell colSpan={6} className="text-center text-muted-foreground py-8">

                                Aucun évènement trouvé.

                            </TableCell>

                        </TableRow>

                    )}

                </TableBody>

            </Table>

        </div>

    );

}