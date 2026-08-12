import { useState } from "react";

import { useSearch } from "@/shared/context/SearchContext";

import type { ContributionStatus } from "../types/contribution.types";
import type { ContributionSort } from "../types/contribution-filter";

export function useContributionFilters() {

    const { search } = useSearch();

    const [status, setStatus] =
        useState<ContributionStatus>();

    const [seasonId, setSeasonId] =
        useState<string>();

    const [contributionPeriodId, setContributionPeriodId] =
        useState<string>();

    const [sortBy, setSortBy] =
        useState<ContributionSort>("dueDate");

    const [order, setOrder] =
        useState<"asc" | "desc">("asc");

    function handleSort(
        column: ContributionSort,
    ) {

        if (column === sortBy) {

            setOrder(current =>

                current === "asc"

                    ? "desc"

                    : "asc"

            );

        } else {

            setSortBy(column);

            setOrder("asc");

        }

    }

    return {

        search,

        status,

        seasonId,

        contributionPeriodId,

        sortBy,

        order,

        setStatus,

        setSeasonId,

        setContributionPeriodId,

        handleSort,

    };

}