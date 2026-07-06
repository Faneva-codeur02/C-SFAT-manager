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

    title: string;

    description: string;

    confirmLabel: string;

    confirmVariant?:
    | "default"
    | "destructive"
    | "secondary";

    loading?: boolean;

    onCancel(): void;

    onConfirm(): void | Promise<void>;

}

export default function ConfirmActionDialog({

    open,

    title,

    description,

    confirmLabel,

    confirmVariant = "default",

    loading = false,

    onCancel,

    onConfirm,

}: Props) {

    return (

        <Dialog
            open={open}
            onOpenChange={onCancel}
        >

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        {title}

                    </DialogTitle>

                    <DialogDescription>

                        {description}

                    </DialogDescription>

                </DialogHeader>

                <DialogFooter>

                    <Button
                        variant="secondary"
                        onClick={onCancel}
                    >

                        Annuler

                    </Button>

                    <Button
                        variant={confirmVariant}
                        onClick={onConfirm}
                        disabled={loading}
                    >

                        {confirmLabel}

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}