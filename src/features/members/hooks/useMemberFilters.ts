import { useState } from "react";

import { useSearch } from "@/shared/context/SearchContext";

import type {
    MemberStatus,
    VoicePart,
} from "@/types";

import type {
    MemberSort,
} from "../types/member-filter";

export function useMemberFilters() {

    const { search } = useSearch();

    const [status, setStatus] =
        useState<MemberStatus>();

    const [voicePart, setVoicePart] =
        useState<VoicePart>();

    const [sortBy, setSortBy] =
        useState<MemberSort>("name");

    const [order, setOrder] =
        useState<"asc" | "desc">("asc");

    function handleSort(
        column: MemberSort,
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

        voicePart,

        sortBy,

        order,

        setStatus,

        setVoicePart,

        handleSort,

    };

}