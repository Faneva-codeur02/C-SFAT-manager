import { useState } from "react";

import { useSearch } from "@/shared/context/SearchContext";

import type { EventStatus, EventType } from "../types/event.types";

export function useEventFilters() {

    const { search } = useSearch();

    const [eventType, setEventType] =
        useState<EventType>();

    const [status, setStatus] =
        useState<EventStatus>();

    return {

        search,

        eventType,

        status,

        setEventType,

        setStatus,

    };

}