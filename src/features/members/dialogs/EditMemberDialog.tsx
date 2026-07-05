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

    }, [member]);

    async function handleSave() {

        if (!member) return;

        try {

            await updateMember(

                member.id,

                form,

            );

            toast.success(

                "Membre modifié avec succès."

            );

            await onUpdated();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(

                "Impossible de modifier le membre."

            );

        }

    }

    if (!member) return null;

    return (

        <Dialog
            open={open}
            onOpenChange={onClose}
        >

            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        Modifier le membre

                    </DialogTitle>

                </DialogHeader>

                <MemberFormFields

                    form={form}

                    setForm={setForm}

                />

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