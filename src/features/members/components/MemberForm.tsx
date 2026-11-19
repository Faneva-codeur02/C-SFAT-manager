import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import { createMember } from "../services/create-member.service";

import { setMemberContributionStart }
    from "../services/set-contribution-start.service";

const schema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    prenom: z.string().min(1, "Le prénom est requis"),
    email: z.string().email("Email invalide"),
    telephone: z.string().optional(),
    adresse: z.string().optional(),
    date_naissance: z.string().optional(),
    profession: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    voice_part: z.enum(["soprano", "alto", "tenor", "bass"]).optional(),
    role: z.enum(["member", "treasurer", "admin"]),
    date_entree: z.string().optional(),
    contribution_start: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreated?: () => void;
};

export default function MemberForm({ open, onOpenChange, onCreated }: Props) {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: "member",
            date_entree: new Date().toISOString().slice(0, 10),
            contribution_start: "2025-01-01",
        },
    });

    async function onSubmit(values: FormValues) {

        let createdId: string;

        try {

            const created = await createMember({
                nom: values.nom,
                prenom: values.prenom,
                email: values.email,
                telephone: values.telephone || null,
                adresse: values.adresse || null,
                date_naissance: values.date_naissance || null,
                profession: values.profession || null,
                gender: values.gender,
                voice_part: values.voice_part,
                role: values.role,
                date_entree: values.date_entree || null,
            });

            createdId = created.id;

        } catch (err) {

            toast.error(
                err instanceof Error ? err.message : "Erreur lors de l'ajout du membre."
            );

            return;
        }

        try {

            await setMemberContributionStart(
                createdId,
                values.contribution_start || "2025-01-01",
            );

            toast.success("Membre ajouté avec succès.");

        } catch (err) {

            console.error(err);

            toast.warning(
                "Membre ajouté, mais ses cotisations n'ont pas pu être générées. "
                + "Modifiez-le pour fixer le début de ses cotisations."
            );
        }

        reset();
        onOpenChange(false);
        onCreated?.();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Ajouter un membre</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" {...register("nom")} />
                            {errors.nom && <p className="text-sm text-destructive mt-1">{errors.nom.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="prenom">Prénom</Label>
                            <Input id="prenom" {...register("prenom")} />
                            {errors.prenom && <p className="text-sm text-destructive mt-1">{errors.prenom.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="telephone">Téléphone</Label>
                            <Input id="telephone" {...register("telephone")} />
                        </div>
                        <div>
                            <Label htmlFor="date_naissance">Date de naissance</Label>
                            <Input id="date_naissance" type="date" {...register("date_naissance")} />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="adresse">Adresse</Label>
                        <Input id="adresse" {...register("adresse")} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label>Pupitre</Label>
                            <Select
                                value={watch("voice_part")}
                                onValueChange={(v) => setValue("voice_part", v as FormValues["voice_part"])}
                            >
                                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="soprano">Soprano</SelectItem>
                                    <SelectItem value="alto">Alto</SelectItem>
                                    <SelectItem value="tenor">Ténor</SelectItem>
                                    <SelectItem value="bass">Basse</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Rôle</Label>
                            <Select
                                value={watch("role")}
                                onValueChange={(v) => setValue("role", v as FormValues["role"])}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="member">Membre</SelectItem>
                                    <SelectItem value="treasurer">Trésorier</SelectItem>
                                    <SelectItem value="admin">Administrateur</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="profession">Profession</Label>
                            <Input id="profession" {...register("profession")} />
                        </div>
                        <div>
                            <Label htmlFor="date_entree">Date d'entrée</Label>
                            <Input id="date_entree" type="date" {...register("date_entree")} />
                        </div>
                        <div>
                            <Label htmlFor="contribution_start">Début des cotisations</Label>
                            <Input
                                id="contribution_start"
                                type="date"
                                {...register("contribution_start")}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Par défaut, les cotisations démarrent en janvier 2025.
                                Choisissez une autre date si le membre cotise depuis plus tard.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Ajout..." : "Ajouter"}
                        </Button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    );
}