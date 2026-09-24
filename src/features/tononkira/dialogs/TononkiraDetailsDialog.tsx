import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";

import { useAudioUrl } from "../hooks/useAudioUrl";
import type { Tononkira } from "../types/tononkira.types";

type Props = {

    song: Tononkira | null;

    open: boolean;

    onOpenChange(open: boolean): void;

};

export default function TononkiraDetailsDialog({
    song,
    open,
    onOpenChange,
}: Props) {

    const audioUrl = useAudioUrl(song?.audio_path ?? null);

    if (!song) return null;

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="max-w-2xl">

                <DialogHeader>

                    <DialogTitle>{song.title}</DialogTitle>

                </DialogHeader>

                <div className="space-y-4">

                    {audioUrl && (

                        <audio controls className="w-full">

                            <source src={audioUrl} />

                        </audio>

                    )}

                    <div className="max-h-96 overflow-y-auto rounded-md border p-4">

                        <p className="whitespace-pre-wrap font-mono text-sm">

                            {song.lyrics}

                        </p>

                    </div>

                </div>

            </DialogContent>

        </Dialog>

    );

}