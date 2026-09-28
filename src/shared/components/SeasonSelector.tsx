import { cn } from "@/shared/utils/utils";
import type { Season } from "@/features/contributions/types/contribution.types";

type Props = {

    seasons: Season[];

    selectedSeasonId?: string;

    onSelect(seasonId: string): void;

};

export default function SeasonSelector({
    seasons,
    selectedSeasonId,
    onSelect,
}: Props) {

    return (

        <div className="flex flex-row flex-wrap gap-1 lg:w-24 lg:shrink-0 lg:flex-col lg:flex-nowrap">

            {[...seasons].reverse().map((season) => (

                <button

                    key={season.id}

                    onClick={() => onSelect(season.id)}

                    className={cn(

                        "px-4 py-2 rounded-md text-sm text-left transition-colors",

                        season.id === selectedSeasonId

                            ? "bg-primary text-primary-foreground"

                            : "text-muted-foreground hover:bg-accent"

                    )}

                >

                    {season.name}

                </button>

            ))}

        </div>

    );

}