import { useEffect, useState } from "react";

import { getEvents } from "../services/events.service";
import type { Event } from "../types/event.types";
import type { EventFilters, EventPagination } from "../types/event-filter";

export function useEvents(
    filters: EventFilters,
    pagination: EventPagination,
) {

    const [events, setEvents] =
        useState<Event[]>([]);

    const [total, setTotal] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadEvents();

    }, [
        filters.search,
        filters.eventType,
        filters.status,
        pagination.page,
        pagination.pageSize,
    ]);

    async function loadEvents() {

        try {
            setLoading(true);

            const result = await getEvents(filters, pagination);

            setEvents(result.events);

            setTotal(result.total);

        } finally {

            setLoading(false);

        }

    }

    return {

        events,

        total,

        loading,

        loadEvents,

    };

}