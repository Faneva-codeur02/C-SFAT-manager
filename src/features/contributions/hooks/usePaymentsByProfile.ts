import { useEffect, useState } from "react";

import {
    getPaymentsByProfile,
} from "../services/contributions.service";
import type { Payment } from "../types/contribution.types";

export function usePaymentsByProfile(profileId: string) {

    const [payments, setPayments] =
        useState<Payment[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!profileId) {

            setLoading(false);

            return;

        }

        loadPayments();

    }, [profileId]);

    async function loadPayments() {

        try {
            setLoading(true);

            const result =
                await getPaymentsByProfile(profileId);

            setPayments(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        payments,

        loading,

        loadPayments,

    };

}