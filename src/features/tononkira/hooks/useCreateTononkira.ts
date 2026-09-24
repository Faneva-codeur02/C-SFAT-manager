import { useState } from "react";

import { createTononkira } from "../services/tononkira.service";
import type { CreateTononkiraPayload, Tononkira } from "../types/tononkira.types";

export function useCreateTononkira() {

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState<Error | null>(null);

    async function submitSong(payload: CreateTononkiraPayload): Promise<Tononkira | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await createTononkira(payload);

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    return { submitSong, submitting, error };

}