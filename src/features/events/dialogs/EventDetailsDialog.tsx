import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Badge } from "@/shared/components/ui/badge";

import type { Event } from "../types/event.types";

const typeLabels: Record<string, string> = {

    concert: "Concert",

    repetition: "Répétition",

    autre: "Autre",

};

type Props = {

    event: Event | null;

    open: boolean;

    onOpenChange(open: boolean): void;

};

export default function EventDetailsDialog({
    event,
    open,
    onOpenChange,
}: Props) {

    if (!event) return null;

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>{event.title}</DialogTitle>

                </DialogHeader>

                <div className="space-y-3 text-sm">

                    <div className="flex items-center gap-2">

                        <Badge variant="outline">{typeLabels[event.event_type]}</Badge>

                        {event.status === "planned" && <Badge variant="secondary">Prévu</Badge>}

                        {event.status === "completed" && <Badge>Terminé</Badge>}

                        {event.status === "cancelled" && <Badge variant="destructive">Annulé</Badge>}

                    </div>

                    <div>

                        <span className="text-muted-foreground">Date : </span>

                        {new Date(event.event_date).toLocaleDateString("fr-FR")}

                    </div>

                    {event.location && (

                        <div>

                            <span className="text-muted-foreground">Lieu : </span>

                            {event.location}

                        </div>

                    )}

                    {event.description && (

                        <div>

                            <div className="text-muted-foreground mb-1">Description :</div>

                            <p className="whitespace-pre-wrap">{event.description}</p>

                        </div>

                    )}

                </div>

            </DialogContent>

        </Dialog>

    );

}