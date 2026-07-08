import { useEffect, useState } from "react";

import {
    getMembers,
} from "../services/member.service";
import type { MemberFilters } from "../types/member-filter";
import type { Profile } from "@/types";

export function useMembers(
    filters: MemberFilters,
) {

    const [members, setMembers] =
        useState<Profile[]>([]);

    const [total, setTotal] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadMembers();

    }, [
        filters.page,
        filters.pageSize,
        filters.search,
        filters.status,
        filters.voicePart,
        filters.sortBy,
        filters.order,
    ]);

    async function loadMembers() {

        try {
            setLoading(true);

            const result =
                await getMembers(filters);

            setMembers(result.members);

            setTotal(result.total);

        } finally {

            setLoading(false);

        }

    }

    return {

        members,

        total,

        loading,

        loadMembers,

    };

}