import { useState } from "react";

import { updateEvent } from "../services/events.service";
import type { Event, UpdateEventPayload } from "../types/event.types";

export function useEditEvent() {

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<Error | null>(null);

    async function submitEdit(

        id: string,

        payload: UpdateEventPayload,

    ): Promise<Event | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await updateEvent(id, payload);

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    return {

        submitEdit,

        submitting,

        error,

    };

}