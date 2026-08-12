import { useState } from "react";

import { createPayment } from "../services/contributions.service";
import type { CreatePaymentPayload, Payment } from "../types/contribution.types";

export function useCreatePayment() {

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<Error | null>(null);

    async function submitPayment(
        payload: CreatePaymentPayload,
    ): Promise<Payment | null> {

        try {

            setSubmitting(true);
            setError(null);

            const payment =
                await createPayment(payload);

            return payment;

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    return {

        submitPayment,

        submitting,

        error,

    };

}