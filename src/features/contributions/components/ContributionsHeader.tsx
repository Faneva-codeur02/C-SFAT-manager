import { Plus } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface Props {

    onCreate(): void;

}

export default function ContributionsHeader({

    onCreate,

}: Props) {

    return (

        <header
            className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            "
        >

            <div className="space-y-1">

                <h1
                    className="
                        text-3xl
                        font-bold
                        tracking-tight
                    "
                >
                    Cotisations
                </h1>

                <p
                    className="
                        text-muted-foreground
                    "
                >
                    Gérez les cotisations des membres et
                    enregistrez leurs paiements.
                </p>

            </div>

            <Button

                onClick={onCreate}

                size="lg"

            >

                <Plus className="mr-2 h-4 w-4" />

                Nouvelle cotisation

            </Button>

        </header>

    );

}