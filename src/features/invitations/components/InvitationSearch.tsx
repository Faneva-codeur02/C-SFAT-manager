import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface Props {

    value: string;

    onChange(
        value: string
    ): void;

}

export default function InvitationSearch({

    value,

    onChange,

}: Props) {

    return (
        <div className="relative w-full max-w-sm">

            <Search
                className="
                    absolute
                    left-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-muted-foreground
                "
            />

            <Input
                className="pl-10"
                placeholder="Rechercher un code..."
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />

        </div>

    );

}