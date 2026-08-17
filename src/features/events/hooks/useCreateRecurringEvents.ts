import { useState } from "react";

import { createRecurringEvents } from "../services/events.service";
import type { CreateRecurringEventsPayload, Event } from "../types/event.types";

export function useCreateRecurringEvents() {

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<Error | null>(null);

    async function submitRecurring(
        payload: CreateRecurringEventsPayload,
    ): Promise<Event[] | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await createRecurringEvents(payload);

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    return {

        submitRecurring,

        submitting,

        error,

    };

}