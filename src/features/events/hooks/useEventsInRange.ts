import { useEffect, useState } from "react";

import { getEventsInRange } from "../services/events.service";
import type { Event, EventStatus, EventType } from "../types/event.types";

export function useEventsInRange(

    startDate: string,

    endDate: string,

    filters: { eventType?: EventType; status?: EventStatus },

) {

    const [events, setEvents] =
        useState<Event[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadEvents();

    }, [startDate, endDate, filters.eventType, filters.status]);

    async function loadEvents() {

        try {
            setLoading(true);

            const result = await getEventsInRange(startDate, endDate, filters);

            setEvents(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        events,

        loading,

        reload: loadEvents,

    };

}