import { useState } from "react";

import { createAccountingEntry } from "../services/accounting.service";
import type { AccountingEntry, CreateManualEntryPayload } from "../types/accounting.types";

export function useCreateAccountingEntry() {

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<Error | null>(null);

    async function submitEntry(
        payload: CreateManualEntryPayload,
    ): Promise<AccountingEntry | null> {

        try {

            setSubmitting(true);
            setError(null);

            const entry = await createAccountingEntry(payload);

            return entry;

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    return {

        submitEntry,

        submitting,

        error,

    };

}