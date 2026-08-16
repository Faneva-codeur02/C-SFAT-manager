import { useEffect, useState } from "react";

import { getFinancialAccounts } from "../services/accounting.service";
import type { FinancialAccount } from "../types/accounting.types";

export function useFinancialAccounts() {

    const [accounts, setAccounts] =
        useState<FinancialAccount[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadAccounts();

    }, []);

    async function loadAccounts() {

        try {
            setLoading(true);

            const result = await getFinancialAccounts();

            setAccounts(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        accounts,

        loading,

    };

}