import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import type { EventStatus, EventType } from "../types/event.types";

type Props = {

    eventType?: EventType;

    status?: EventStatus;

    onTypeChange(value: EventType | undefined): void;

    onStatusChange(value: EventStatus | undefined): void;

};

export default function EventsFiltersBar({
    eventType,
    status,
    onTypeChange,
    onStatusChange,
}: Props) {

    const typeItems = [

        { value: "all", label: "Tous les types" },

        { value: "concert", label: "Concert" },

        { value: "repetition", label: "Répétition" },

        { value: "autre", label: "Autre" },

    ];

    const statusItems = [

        { value: "all", label: "Tous les statuts" },

        { value: "planned", label: "Prévu" },

        { value: "completed", label: "Terminé" },

        { value: "cancelled", label: "Annulé" },

    ];

    function handleTypeChange(value: string | null) {

        onTypeChange(

            value === null || value === "all"

                ? undefined

                : (value as EventType),

        );

    }

    function handleStatusChange(value: string | null) {

        onStatusChange(

            value === null || value === "all"

                ? undefined

                : (value as EventStatus),

        );

    }

    return (

        <div className="flex gap-3 mb-4">

            <Select

                items={typeItems}

                value={eventType ?? "all"}

                onValueChange={handleTypeChange}

            >

                <SelectTrigger className="w-44">

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    {typeItems.map((item) => (

                        <SelectItem key={item.value} value={item.value}>

                            {item.label}

                        </SelectItem>

                    ))}

                </SelectContent>

            </Select>

            <Select

                items={statusItems}

                value={status ?? "all"}

                onValueChange={handleStatusChange}

            >

                <SelectTrigger className="w-44">

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    {statusItems.map((item) => (

                        <SelectItem key={item.value} value={item.value}>

                            {item.label}

                        </SelectItem>

                    ))}

                </SelectContent>

            </Select>

        </div>

    );

}