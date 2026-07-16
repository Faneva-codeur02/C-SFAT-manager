import { useState } from "react";
import type {
    InvitationStatus,
    InvitationSort,
} from "../types/invitation-filter";

export function useInvitationFilters() {

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState<InvitationStatus>("all");

    const [sortBy, setSortBy] =
        useState<InvitationSort>(
            "createdAt"
        );

    const [order, setOrder] =
        useState<"asc" | "desc">(
            "desc"
        );

    function handleSort(
        column: InvitationSort
    ) {

        if (sortBy === column) {

            setOrder(current =>

                current === "asc"
                    ? "desc"
                    : "asc"

            );

            return;

        }

        setSortBy(column);

        setOrder("asc");

    }
    return {

        search,

        setSearch,

        status,

        setStatus,

        sortBy,

        order,

        handleSort,

    };

}