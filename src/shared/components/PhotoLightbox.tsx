import { X } from "lucide-react";

import {
    Dialog,
    DialogContent,
} from "@/shared/components/ui/dialog";

interface Props {

    url: string | null;

    open: boolean;

    onOpenChange(open: boolean): void;

}

export default function PhotoLightbox({
    url,
    open,
    onOpenChange,
}: Props) {

    if (!url) return null;

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="max-w-xl border-none bg-transparent p-0 shadow-none">

                <button

                    onClick={() => onOpenChange(false)}

                    className="absolute -top-10 right-0 text-white/80 hover:text-white"

                >

                    <X className="h-6 w-6" />

                </button>

                <img

                    src={url}

                    alt="Photo de profil"

                    className="w-full rounded-lg object-cover"

                />

            </DialogContent>

        </Dialog>

    );

}