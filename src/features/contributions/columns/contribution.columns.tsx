import type {
    ColumnDef,
} from "@tanstack/react-table";

import {

    actionColumn,

    moneyColumn,

    statusColumn,

    textColumn,

} from "@/shared/components/data-table/builders";

import ContributionRowActions
    from "../components/ContributionRowActions";

import type {
    ContributionRow,
} from "../types/contribution-row";

export const contributionColumns: ColumnDef<ContributionRow>[] = [

    textColumn<ContributionRow>(
        "memberName",
        "Membre",
    ),

    textColumn<ContributionRow>(
        "period",
        "Période",
    ),

    moneyColumn<ContributionRow>(
        "amountDue",
        "Montant dû",
    ),

    moneyColumn<ContributionRow>(
        "amountPaid",
        "Montant payé",
    ),

    moneyColumn<ContributionRow>(
        "remaining",
        "Reste",
    ),

    statusColumn<ContributionRow>(
        "status",
        "Statut",
    ),

    actionColumn({

        render: (row) => (

            <ContributionRowActions

                contribution={row}

            />

        ),

    }),

];