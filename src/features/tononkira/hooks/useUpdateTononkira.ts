import { useState } from "react";

import { updateTononkira } from "../services/tononkira.service";
import type { Tononkira, UpdateTononkiraPayload } from "../types/tononkira.types";

export function useUpdateTononkira() {

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState<Error | null>(null);

    async function submitUpdate(

        id: string,

        payload: UpdateTononkiraPayload,

    ): Promise<Tononkira | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await updateTononkira(id, payload);

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    return { submitUpdate, submitting, error };

}