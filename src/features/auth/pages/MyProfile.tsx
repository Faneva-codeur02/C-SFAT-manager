import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { ProfileService } from "@/features/auth/services/profile.service";

const profileSchema = z.object({

    nom: z.string().min(1, "Le nom est requis"),

    prenom: z.string().min(1, "Le prénom est requis"),

    telephone: z.string().optional(),

});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function MyProfile() {

    const { user } = useAuth();

    const profile = useProfile(user?.id);

    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({

        resolver: zodResolver(profileSchema),

        defaultValues: {

            nom: "",

            prenom: "",

            telephone: "",

        },

    });

    useEffect(() => {

        if (profile) {

            reset({

                nom: profile.nom,

                prenom: profile.prenom,

                telephone: profile.telephone ?? "",

            });

        }

    }, [profile]);

    async function onSubmit(values: ProfileFormValues) {

        if (!user) return;

        try {

            setSaving(true);

            await ProfileService.update(user.id, values);

            toast.success("Profil mis à jour.");

        } catch {

            toast.error("Impossible de mettre à jour le profil.");

        } finally {

            setSaving(false);

        }

    }

    if (!profile) {

        return (

            <AppLayout>

                <p className="text-muted-foreground">Chargement...</p>

            </AppLayout>

        );

    }

    return (

        <AppLayout>

            <h1 className="text-3xl font-bold mb-6">Mon profil</h1>

            <div className="max-w-lg space-y-6">

                <div className="flex items-center gap-4">

                    <Avatar className="h-16 w-16">

                        <AvatarImage src={profile.photo_url ?? ""} />

                        <AvatarFallback className="text-lg">

                            {profile.prenom?.charAt(0)}
                            {profile.nom?.charAt(0)}

                        </AvatarFallback>

                    </Avatar>

                    <div>

                        <p className="font-medium">{profile.email}</p>

                        <p className="text-sm text-muted-foreground capitalize">

                            {profile.role}

                        </p>

                    </div>

                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>

                        <Label htmlFor="nom">Nom</Label>

                        <Input id="nom" {...register("nom")} />

                        {errors.nom && (

                            <p className="text-sm text-destructive mt-1">
                                {errors.nom.message}
                            </p>

                        )}

                    </div>

                    <div>

                        <Label htmlFor="prenom">Prénom</Label>

                        <Input id="prenom" {...register("prenom")} />

                        {errors.prenom && (

                            <p className="text-sm text-destructive mt-1">
                                {errors.prenom.message}
                            </p>

                        )}

                    </div>

                    <div>

                        <Label htmlFor="telephone">Téléphone</Label>

                        <Input id="telephone" {...register("telephone")} />

                    </div>

                    <Button type="submit" disabled={saving}>

                        {saving ? "Enregistrement..." : "Enregistrer"}

                    </Button>

                </form>

            </div>

        </AppLayout>

    );

}