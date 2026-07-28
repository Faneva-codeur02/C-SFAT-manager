import { Search } from "lucide-react";

import { Input } from "@/shared/components/ui/input";

interface Props {

    value: string;

    onChange(value: string): void;

}

export default function DataTableSearch({

    value,

    onChange,

}: Props) {

    return (

        <div className="relative w-full sm:max-w-sm">

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

                value={value}

                placeholder="Rechercher..."

                onChange={(e) =>

                    onChange(e.target.value)

                }

                className="pl-10"

            />

        </div>

    );

}