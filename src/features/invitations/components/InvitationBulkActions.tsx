import { Button } from "@/shared/components/ui/button";

import {
    Copy,
    Trash2,
    Download,
} from "lucide-react";

interface Props {

    count: number;

    onCopy(): void;

    onDelete(): void;

    onExport(): void;

}

export default function InvitationBulkActions({

    count,

    onCopy,

    onDelete,

    onExport,

}: Props) {

    if (count === 0) {

        return null;

    }

    return (

        <div
            className="
                mb-4
                flex
                items-center
                justify-between
                rounded-lg
                border
                bg-muted/40
                p-3
            "
        >

            <span className="font-medium">

                {count} code(s) sélectionné(s)

            </span>

            <div className="flex gap-2">

                <Button

                    variant="outline"

                    onClick={onCopy}

                >

                    <Copy className="mr-2 h-4 w-4" />

                    Copier

                </Button>

                <Button

                    variant="outline"

                    onClick={onExport}

                >

                    <Download className="mr-2 h-4 w-4" />

                    CSV

                </Button>

                <Button

                    variant="destructive"

                    onClick={onDelete}

                >

                    <Trash2 className="mr-2 h-4 w-4" />

                    Supprimer

                </Button>

            </div>

        </div>

    );

}