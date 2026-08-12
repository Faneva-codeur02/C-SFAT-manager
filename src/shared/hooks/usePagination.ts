import { useState } from "react";

export function usePagination() {

    const [page, setPage] =
        useState(0);

    const [pageSize, setPageSize] =
        useState(10);

    function changePageSize(
        size: number
    ) {

        setPageSize(size);

        // revenir à la première page
        setPage(0);

    }

    return {

        page,

        setPage,

        pageSize,

        setPageSize: changePageSize,

    };

}