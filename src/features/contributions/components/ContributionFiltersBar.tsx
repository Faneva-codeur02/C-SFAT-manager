import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import type {
    ContributionStatus,
    ContributionPeriod,
} from "../types/contribution.types";

type Props = {

    status?: ContributionStatus;

    periods: ContributionPeriod[];

    contributionPeriodId?: string;

    onStatusChange(status: ContributionStatus | undefined): void;

    onPeriodChange(periodId: string | undefined): void;

};

export default function ContributionFiltersBar({
    status,
    periods,
    contributionPeriodId,
    onStatusChange,
    onPeriodChange,
}: Props) {

    const statusItems = [

        { value: "all", label: "Tous les statuts" },

        { value: "pending", label: "En attente" },

        { value: "partial", label: "Partiel" },

        { value: "paid", label: "Payé" },

        { value: "cancelled", label: "Annulé" },

    ];

    const periodItems = [

        { value: "all", label: "Toutes les périodes" },

        ...periods.map((period) => ({

            value: period.id,

            label: `Semaine ${period.week_number}`,

        })),

    ];

    function handleStatusChange(
        value: string | null,
    ) {

        if (value === null || value === "all") {

            onStatusChange(undefined);

            return;

        }

        onStatusChange(value as ContributionStatus);

    }

    function handlePeriodChange(
        value: string | null,
    ) {

        if (value === null || value === "all") {

            onPeriodChange(undefined);

            return;

        }

        onPeriodChange(value);

    }

    return (
        <div className="flex gap-3 mb-4">

            <Select

                items={statusItems}

                value={status ?? "all"}

                onValueChange={handleStatusChange}

            >

                <SelectTrigger className="w-48">

                    <SelectValue placeholder="Statut" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">Tous les statuts</SelectItem>

                    <SelectItem value="pending">En attente</SelectItem>

                    <SelectItem value="partial">Partiel</SelectItem>

                    <SelectItem value="paid">Payé</SelectItem>

                    <SelectItem value="cancelled">Annulé</SelectItem>

                </SelectContent>

            </Select>

            <Select

                items={periodItems}

                value={contributionPeriodId ?? "all"}

                onValueChange={handlePeriodChange}
            >

                <SelectTrigger className="w-56">

                    <SelectValue placeholder="Période" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">Toutes les périodes</SelectItem>

                    {periods.map((period) => (

                        <SelectItem key={period.id} value={period.id}>

                            Semaine {period.week_number}

                        </SelectItem>

                    ))}

                </SelectContent>

            </Select>

        </div>
    );

}