import { useEffect, useState } from "react";

import { getMembersInArrears } from "../services/reports.service";
import type { MemberArrearsRow } from "../types/report.types";

export function useMembersInArrears() {

    const [rows, setRows] =
        useState<MemberArrearsRow[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadRows();

    }, []);

    async function loadRows() {

        try {
            setLoading(true);

            const result = await getMembersInArrears();

            setRows(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        rows,

        loading,

    };

}