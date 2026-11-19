import { useEffect, useState } from "react";

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

import MemberFormFields
    from "../forms/MemberFormFields";

import { updateMember }
    from "../services/update-member.service";

import { toast } from "sonner";

import { setMemberContributionStart }
    from "../services/set-contribution-start.service";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";

interface Props {

    member: Profile | null;

    open: boolean;

    onClose(): void;

    onUpdated(): Promise<void> | void;

}

export default function EditMemberDialog({

    member,

    open,

    onClose,

    onUpdated,

}: Props) {

    const [form, setForm] = useState({

        nom: "",

        prenom: "",

        email: "",

        telephone: "",

        role: "member" as UserRole,

        voice_part: "tenor" as VoicePart,

        date_entree: "",

    });

    const [contributionStart, setContributionStart] = useState("");

    useEffect(() => {

        if (!member) return;

        setForm({

            nom: member.nom,

            prenom: member.prenom,

            email: member.email,

            telephone: member.telephone ?? "",

            role: member.role ?? "member",

            voice_part: member.voice_part ?? "tenor",

            date_entree:
                member.date_entree ?? "",

        });

        setContributionStart(member.member_since ?? "");

    }, [member]);

    async function handleSave() {

        if (!member) return;

        try {

            await updateMember(member.id, form);

        } catch (error) {

            console.error(error);

            toast.error("Impossible de modifier le membre.");

            return;

        }

        const startChanged =
            contributionStart !== "" &&
            contributionStart !== (member.member_since ?? "");

        if (startChanged) {

            try {

                await setMemberContributionStart(member.id, contributionStart);

            } catch (error) {

                console.error(error);

                // Le message de la base est explicite (ex. "3 mois avant cette date ont déjà un paiement…")
                toast.error(
                    (error as { message?: string })?.message
                    ?? "Impossible de modifier le début des cotisations."
                );

                await onUpdated();

                return;

            }

        }

        toast.success("Membre modifié avec succès.");

        await onUpdated();

        onClose();

    }

    if (!member) return null;

    return (

        <Dialog
            open={open}
            onOpenChange={onClose}
        >

            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">

                <DialogHeader>

                    <DialogTitle>

                        Modifier le membre

                    </DialogTitle>

                </DialogHeader>

                <MemberFormFields

                    form={form}

                    setForm={setForm}

                />

                <div className="space-y-1">

                    <Label htmlFor="contribution_start">
                        Début des cotisations
                    </Label>

                    <Input
                        id="contribution_start"
                        type="date"
                        value={contributionStart}
                        onChange={(e) => setContributionStart(e.target.value)}
                    />

                    <p className="text-xs text-muted-foreground">
                        Les mois avant cette date seront retirés de ses cotisations
                        (impossible si un paiement y est déjà enregistré).
                        Modifiez-la avant de saisir son paiement.
                    </p>

                </div>

                <div className="flex justify-end gap-3">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >

                        Annuler

                    </Button>

                    <Button
                        onClick={handleSave}
                    >

                        Enregistrer

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}