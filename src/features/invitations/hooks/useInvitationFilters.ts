import { useState } from "react";

export function useInvitationFilters() {

    const [search, setSearch] =
        useState("");

    return {

        search,

        setSearch,

    };

}