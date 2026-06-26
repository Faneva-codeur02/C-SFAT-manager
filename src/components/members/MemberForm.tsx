import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function MemberForm({
    open,
    onOpenChange,
}: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ajouter un membre
                    </DialogTitle>
                </DialogHeader>

                <p>
                    Formulaire à construire...
                </p>
            </DialogContent>
        </Dialog>
    );
}