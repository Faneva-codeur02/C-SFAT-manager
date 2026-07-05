import { useState } from "react";
import type {
    Profile,
    UserRole,
    VoicePart,
} from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { useAuth } from "@/features/auth/context/AuthContext";
import { approveMember } from "../services/registration.service";
import { rejectMember } from "../services/registration.service";
import { toast } from "sonner";

interface Props {
    member: Profile | null;
    open: boolean;
    onClose: () => void;
    onApproved: () => Promise<void> | void;
}

export default function ApproveRegistrationDialog({
    member,
    open,
    onClose,
    onApproved,
}: Props) {

    const [role, setRole] =
        useState<UserRole>("member");

    const [voicePart, setVoicePart] =
        useState<VoicePart>("tenor");

    const [dateEntree, setDateEntree] =
        useState(
            new Date()
                .toISOString()
                .substring(0, 10)
        );

    if (!member) return null;

    const { user } = useAuth();

    async function handleApprove() {

        if (!member || !user) return;

        try {

            await approveMember(
                member.id,
                role,
                voicePart,
                user.id,
                dateEntree,
            );

            toast.success(
                "Le membre a été validé avec succès."
            );

            await onApproved();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                "Impossible de valider le membre."
            );

        }

    }

    async function handleReject() {

        if (!member || !user) return;

        try {

            await rejectMember(
                member.id,
                user.id,
            );

            toast.success(
                "Le membre a été refusé."
            );

            await onApproved();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                "Impossible de refuser le membre."
            );

        }

    }

    return (

        <Dialog
            open={open}
            onOpenChange={onClose}
        >

            <DialogContent className="max-w-lg">

                <DialogHeader>

                    <DialogTitle>

                        Validation d'une inscription

                    </DialogTitle>

                </DialogHeader>

                <div className="grid gap-4">

                    <div>

                        <Label>Nom</Label>

                        <Input
                            value={`${member.nom} ${member.prenom}`}
                            disabled
                        />

                    </div>

                    <div>

                        <Label>Email</Label>

                        <Input
                            value={member.email}
                            disabled
                        />

                    </div>

                    <div>

                        <Label>Téléphone</Label>

                        <Input
                            value={member.telephone ?? ""}
                            disabled
                        />

                    </div>

                </div>

                <div>

                    <Label>Rôle</Label>

                    <Select
                        value={role}
                        onValueChange={(value) =>
                            setRole(value as UserRole)
                        }
                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="member">
                                Membre
                            </SelectItem>

                            <SelectItem value="treasurer">
                                Trésorier
                            </SelectItem>

                            <SelectItem value="admin">
                                Administrateur
                            </SelectItem>

                        </SelectContent>

                    </Select>

                </div>

                <div>

                    <Label>Pupitre</Label>

                    <Select
                        value={voicePart}
                        onValueChange={(value) =>
                            setVoicePart(value as VoicePart)
                        }
                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="soprano">
                                Soprano
                            </SelectItem>

                            <SelectItem value="alto">
                                Alto
                            </SelectItem>

                            <SelectItem value="tenor">
                                Ténor
                            </SelectItem>

                            <SelectItem value="bass">
                                Basse
                            </SelectItem>

                        </SelectContent>

                    </Select>

                </div>

                <div>

                    <Label>Date d'entrée</Label>

                    <Input
                        type="date"
                        value={dateEntree}
                        onChange={(e) =>
                            setDateEntree(e.target.value)
                        }
                    />

                </div>

                <div className="flex justify-end gap-3">

                    <Button
                        variant="destructive"
                        onClick={handleReject}
                    >
                        Refuser
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Annuler
                    </Button>

                    <Button
                        onClick={handleApprove}
                    >

                        Valider

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}