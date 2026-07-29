import {
    AlertTriangle,
    Loader2,
    Trash2,
} from "lucide-react";

import {

    Dialog,

    DialogContent,

    DialogDescription,

    DialogFooter,

    DialogHeader,

    DialogTitle,

} from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";

interface Props {

    open: boolean;

    onOpenChange(open: boolean): void;

    title?: string;

    description?: string;

    loading?: boolean;

    onConfirm(): void;

}

export default function ConfirmDeleteDialog({

    open,

    onOpenChange,

    title = "Supprimer cet élément ?",

    description =

    "Cette action est irréversible. Les données supprimées ne pourront pas être récupérées.",

    loading = false,

    onConfirm,

}: Props) {

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent className="sm:max-w-md">

                <DialogHeader>

                    <div
                        className="
                            mx-auto
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            bg-red-100
                            dark:bg-red-950/40
                        "
                    >

                        <AlertTriangle

                            className="
                                h-7
                                w-7
                                text-red-600
                            "

                        />

                    </div>

                    <DialogTitle className="text-center">

                        {title}

                    </DialogTitle>

                    <DialogDescription className="text-center">

                        {description}

                    </DialogDescription>

                </DialogHeader>

                <DialogFooter className="mt-6">

                    <Button

                        variant="outline"

                        onClick={() =>

                            onOpenChange(false)

                        }

                        disabled={loading}

                    >

                        Annuler

                    </Button>

                    <Button

                        variant="destructive"

                        disabled={loading}

                        onClick={onConfirm}

                    >

                        {

                            loading

                                ? (

                                    <>

                                        <Loader2

                                            className="mr-2 h-4 w-4 animate-spin"

                                        />

                                        Suppression...

                                    </>

                                )

                                : (

                                    <>

                                        <Trash2

                                            className="mr-2 h-4 w-4"

                                        />

                                        Supprimer

                                    </>

                                )

                        }

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}