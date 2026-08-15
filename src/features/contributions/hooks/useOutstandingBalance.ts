import { useEffect, useState } from "react";

import { getOutstandingBalance } from "../services/contributions.service";

export function useOutstandingBalance(profileId?: string) {

    const [balance, setBalance] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!profileId) {

            setLoading(false);

            return;

        }

        loadBalance();

    }, [profileId]);

    async function loadBalance() {

        try {
            setLoading(true);

            const result =
                await getOutstandingBalance(profileId!);

            setBalance(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        balance,

        loading,

        reloadBalance: loadBalance,

    };

}