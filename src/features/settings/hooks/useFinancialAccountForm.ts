import { useState } from "react";

import {
    createFinancialAccount,
    updateFinancialAccount,
} from "@/features/accounting/services/accounting.service";
import type {
    CreateFinancialAccountPayload,
    UpdateFinancialAccountPayload,
} from "@/features/accounting/services/accounting.service";
import type { FinancialAccount } from "@/features/accounting/types/accounting.types";

export function useFinancialAccountForm() {

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState<Error | null>(null);

    async function create(
        payload: CreateFinancialAccountPayload,
    ): Promise<FinancialAccount | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await createFinancialAccount(payload);

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    async function update(

        id: string,

        payload: UpdateFinancialAccountPayload,

    ): Promise<FinancialAccount | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await updateFinancialAccount(id, payload);

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    return {

        create,

        update,

        submitting,

        error,

    };

}