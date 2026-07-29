import type {
    ColumnDef,
} from "@tanstack/react-table";

import {

    actionColumn,

    moneyColumn,

    statusColumn,

    textColumn,

} from "@/shared/components/data-table/builders";

import type {
    ContributionRow,
} from "../types/contribution-row";

import {

    CreditCard,

    Eye,

    Pencil,

    Trash2,

} from "lucide-react";

import DataTableRowActions
    from "@/shared/components/data-table/DataTableRowActions";

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

            <DataTableRowActions

                row={row}

                actions={[

                    {

                        label: "Voir",

                        icon: Eye,

                        onClick: (row) => {

                            console.log(row);

                        },

                    },

                    {

                        label: "Paiement",

                        icon: CreditCard,

                        onClick: (row) => {

                            console.log(row);

                        },

                    },

                    {

                        label: "Modifier",

                        icon: Pencil,

                        onClick: (row) => {

                            console.log(row);

                        },

                    },

                    {

                        label: "Supprimer",

                        icon: Trash2,

                        destructive: true,

                        onClick: (row) => {

                            console.log(row);

                        },

                    },

                ]}

            />

        ),

    })
];