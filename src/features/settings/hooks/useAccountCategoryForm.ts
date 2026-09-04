import { useState } from "react";

import {
    createAccountCategory,
    updateAccountCategory,
} from "@/features/accounting/services/accounting.service";
import type {
    CreateAccountCategoryPayload,
    UpdateAccountCategoryPayload,
} from "@/features/accounting/services/accounting.service";
import type { AccountCategory } from "@/features/accounting/types/accounting.types";

export function useAccountCategoryForm() {

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState<Error | null>(null);

    async function create(
        payload: CreateAccountCategoryPayload,
    ): Promise<AccountCategory | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await createAccountCategory(payload);

        } catch (err) {

            setError(err as Error);

            return null;

        } finally {

            setSubmitting(false);

        }

    }

    async function update(

        id: string,

        payload: UpdateAccountCategoryPayload,

    ): Promise<AccountCategory | null> {

        try {

            setSubmitting(true);
            setError(null);

            return await updateAccountCategory(id, payload);

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