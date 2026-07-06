import { Button } from "@/shared/components/ui/button";

interface Props {

    count: number;

    onDeactivate(): void;

    onReactivate(): void;

    onExport(): void;

    onArchive(): void;

}

export default function BulkActionsBar({

    count,

    onDeactivate,

    onReactivate,

    onExport,

    onArchive,

}: Props) {

    if (count === 0) return null;

    return (

        <div className="mb-5 flex items-center justify-between rounded-lg border bg-muted p-4">

            <span className="font-medium">

                {count} membre(s) sélectionné(s)

            </span>

            <div className="flex gap-2">

                <Button
                    variant="secondary"
                    onClick={onDeactivate}
                >
                    Désactiver
                </Button>

                <Button
                    variant="secondary"
                    onClick={onReactivate}
                >
                    Réactiver
                </Button>

                <Button
                    variant="outline"
                    onClick={onExport}
                >
                    Exporter
                </Button>

                <Button
                    variant="destructive"
                    onClick={onArchive}
                >
                    Archiver
                </Button>

            </div>

        </div>

    );

}