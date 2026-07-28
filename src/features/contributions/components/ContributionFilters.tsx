import {
    Search,
    RotateCcw,
} from "lucide-react";

import {
    Input,
} from "@/shared/components/ui/input";

import {
    Button,
} from "@/shared/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

export interface ContributionFiltersValue {

    search: string;

    status: string;

    season: string;

    week: string;

}

interface Props {

    value: ContributionFiltersValue;

    onChange: (
        value: ContributionFiltersValue
    ) => void;

}

const defaultFilters: ContributionFiltersValue = {

    search: "",

    status: "all",

    season: "all",

    week: "all",

};

export default function ContributionFilters({

    value,

    onChange,

}: Props) {

    function update<K extends keyof ContributionFiltersValue>(

        key: K,

        newValue: ContributionFiltersValue[K]

    ) {

        onChange({

            ...value,

            [key]: newValue,

        });

    }

    return (

        <div
            className="
                flex
                flex-col
                gap-4
                rounded-xl
                border
                bg-card
                p-4
                lg:flex-row
                lg:items-center
            "
        >

            {/* Recherche */}

            <div className="relative flex-1">

                <Search
                    size={16}
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-muted-foreground
                    "
                />

                <Input

                    value={value.search}

                    onChange={(e) =>

                        update(
                            "search",
                            e.target.value
                        )

                    }

                    placeholder="Rechercher un membre..."

                    className="pl-10"

                />

            </div>

            {/* Statut */}

            <Select
                value={value.status}
                onValueChange={(v) => {

                    if (v === null) return;

                    update("status", v);

                }}
            >

                <SelectTrigger className="w-full lg:w-48">

                    <SelectValue placeholder="Statut" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        Tous
                    </SelectItem>

                    <SelectItem value="paid">
                        Payé
                    </SelectItem>

                    <SelectItem value="partial">
                        Partiel
                    </SelectItem>

                    <SelectItem value="pending">
                        En attente
                    </SelectItem>

                    <SelectItem value="cancelled">
                        Annulé
                    </SelectItem>

                </SelectContent>

            </Select>

            {/* Saison */}

            <Select

                value={value.season}

                onValueChange={(v) => {

                    if (v === null) return;

                    update("season", v);

                }}

            >

                <SelectTrigger className="w-full lg:w-44">

                    <SelectValue placeholder="Saison" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">

                        Toutes

                    </SelectItem>

                    {/* Plus tard :
                        seasons.map(...)
                    */}

                </SelectContent>

            </Select>

            {/* Semaine */}

            <Select

                value={value.week}

                onValueChange={(v) => {

                    if (v === null) return;

                    update("week", v);

                }}

            >

                <SelectTrigger className="w-full lg:w-40">

                    <SelectValue placeholder="Semaine" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">

                        Toutes

                    </SelectItem>

                    {

                        Array.from({

                            length: 52,

                        }).map((_, index) => (

                            <SelectItem

                                key={index}

                                value={`${index + 1}`}

                            >

                                Semaine {index + 1}

                            </SelectItem>

                        ))

                    }

                </SelectContent>

            </Select>

            {/* Reset */}

            <Button

                variant="outline"

                onClick={() =>

                    onChange(defaultFilters)

                }

            >

                <RotateCcw className="mr-2 h-4 w-4" />

                Réinitialiser

            </Button>

        </div>

    );

}