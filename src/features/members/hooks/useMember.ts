import { useEffect, useState } from "react";

import {
    getMembers,
} from "../services/member.service";
import type { MemberFilters, MemberPagination } from "../types/member-filter";
import type { Profile } from "@/types";

export function useMembers(
    filters: MemberFilters,
    pagination: MemberPagination,
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
        filters.search,
        filters.status,
        filters.voicePart,
        filters.sortBy,
        filters.order,
        pagination.page,
        pagination.pageSize,
    ]);

    async function loadMembers() {

        try {
            setLoading(true);

            const result =
                await getMembers(filters, pagination);

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