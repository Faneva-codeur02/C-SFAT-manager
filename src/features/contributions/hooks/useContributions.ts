import { useEffect, useState } from "react";

import {
    getMemberContributions,
} from "../services/contributions.service";
import type {
    MemberContributionWithDetails,
} from "../types/contribution.types";

import type {
    ContributionFilters,
    ContributionPagination,
} from "../types/contribution-filter";

export function useContributions(
    filters: ContributionFilters,
    pagination: ContributionPagination,
) {

    const [contributions, setContributions] =
        useState<MemberContributionWithDetails[]>([]);

    const [total, setTotal] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadContributions();

    }, [
        filters.search,
        filters.status,
        filters.seasonId,
        filters.contributionPeriodId,
        filters.sortBy,
        filters.order,
        pagination.page,
        pagination.pageSize,
    ]);

    async function loadContributions() {

        try {
            setLoading(true);

            const result =
                await getMemberContributions(filters, pagination);

            setContributions(result.contributions);

            setTotal(result.total);

        } finally {

            setLoading(false);

        }

    }

    return {

        contributions,

        total,

        loading,

        loadContributions,

    };

}