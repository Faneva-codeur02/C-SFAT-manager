import DataTable
    from "@/shared/components/data-table/DataTable";

import {

    contributionColumns,

} from "../columns/contribution.columns";

import type {

    ContributionRow,

} from "../types/contribution-row";

interface Props {

    data: ContributionRow[];

}

export default function ContributionsTable({

    data,

}: Props) {

    return (

        <DataTable

            columns={contributionColumns}

            data={data}

        />

    );

}