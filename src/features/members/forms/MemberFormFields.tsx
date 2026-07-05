import {
    Input,
} from "@/shared/components/ui/input";

import {
    Label,
} from "@/shared/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import type {
    UserRole,
    VoicePart,
} from "@/types";

interface Props {

    form: {

        nom: string;

        prenom: string;

        email: string;

        telephone: string;

        role: UserRole;

        voice_part: VoicePart;

        date_entree: string;

    };

    setForm(
        value: any,
    ): void;

}

export default function MemberFormFields({

    form,

    setForm,

}: Props) {

    return (

        <div className="grid gap-4">

            <div>

                <Label>Nom</Label>

                <Input
                    value={form.nom}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            nom: e.target.value,
                        })
                    }
                />

            </div>

            <div>

                <Label>Prénom</Label>

                <Input
                    value={form.prenom}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            prenom: e.target.value,
                        })
                    }
                />

            </div>

            <div>

                <Label>Email</Label>

                <Input
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                />

            </div>

            <div>

                <Label>Téléphone</Label>

                <Input
                    value={form.telephone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            telephone: e.target.value,
                        })
                    }
                />

            </div>

            <div>

                <Label>Pupitre</Label>

                <Select
                    value={form.voice_part}
                    onValueChange={(value) =>
                        setForm({
                            ...form,
                            voice_part: value,
                        })
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

                <Label>Rôle</Label>

                <Select
                    value={form.role}
                    onValueChange={(value) =>
                        setForm({
                            ...form,
                            role: value,
                        })
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

                <Label>Date d'entrée</Label>

                <Input
                    type="date"
                    value={form.date_entree}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            date_entree: e.target.value,
                        })
                    }
                />

            </div>

        </div>

    );

}