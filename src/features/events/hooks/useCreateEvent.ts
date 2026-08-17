import { useState } from "react";

import { createEvent } from "../services/events.service";
import type { CreateEventPayload, Event } from "../types/event.types";

export function useCreateEvent() {

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<Error | null>(null);

    async function submitEvent(
        payload: CreateEventPayload,
    ): Promise<Event | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await createEvent(payload);

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    return {

        submitEvent,

        submitting,

        error,

    };

}