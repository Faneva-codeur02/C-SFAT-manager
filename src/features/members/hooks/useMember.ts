import { useEffect, useState } from "react";

import {
    getMembers,
} from "../services/member.service";
import type { MemberFilters } from "../types/member-filter";

export function useMembers(
    filters?: MemberFilters,
) {

    const [members, setMembers] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadMembers();

    }, [
        filters?.search,
        filters?.status,
        filters?.voicePart,
        filters?.sortBy,
        filters?.order,
    ]);

    async function loadMembers() {

        try {

            const data =
                await getMembers(filters);

            setMembers(data);

        } finally {

            setLoading(false);

        }

    }

    return {
        members,
        loading,
        loadMembers,
    };

}