import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { ProfileService } from "@/features/auth/services/profile.service";
import { Camera, Trash2 } from "lucide-react";

import ProfileAvatar from "@/shared/components/ProfileAvatar";
import { uploadAvatar, deleteAvatar } from "../services/avatar.service";

const profileSchema = z.object({

    nom: z.string().min(1, "Le nom est requis"),

    prenom: z.string().min(1, "Le prénom est requis"),

    telephone: z.string().optional(),

});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function MyProfile() {

    const { user } = useAuth();

    const profile = useProfile(user?.id);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadingPhoto, setUploadingPhoto] = useState(false);

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

    async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];

        if (!file || !user) return;

        if (!file.type.startsWith("image/")) {

            toast.error("Le fichier doit être une image.");

            return;

        }

        if (file.size > 2 * 1024 * 1024) {

            toast.error("L'image ne doit pas dépasser 2 Mo.");

            return;

        }

        try {

            setUploadingPhoto(true);

            const path = await uploadAvatar(user.id, file);

            await ProfileService.update(user.id, { photo_url: path });

            toast.success("Photo mise à jour.");

        } catch {

            toast.error("Impossible de mettre à jour la photo.");

        } finally {

            setUploadingPhoto(false);

            if (fileInputRef.current) fileInputRef.current.value = "";

        }

    }

    async function handlePhotoDelete() {

        if (!user || !profile?.photo_url) return;

        try {

            setUploadingPhoto(true);

            await deleteAvatar(profile.photo_url);

            await ProfileService.update(user.id, { photo_url: null });

            toast.success("Photo supprimée.");

        } catch {

            toast.error("Impossible de supprimer la photo.");

        } finally {

            setUploadingPhoto(false);

        }

    }

    return (

        <AppLayout>

            <h1 className="text-3xl font-bold mb-6">Mon profil</h1>

            <div className="max-w-lg space-y-6">

                <div className="flex items-center gap-4">

                    <div className="relative">

                        <ProfileAvatar

                            path={profile.photo_url}

                            fallback={`${profile.prenom?.charAt(0) ?? ""}${profile.nom?.charAt(0) ?? ""}`}

                            className="h-16 w-16"

                        />

                        <button

                            type="button"

                            onClick={() => fileInputRef.current?.click()}

                            disabled={uploadingPhoto}

                            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"

                        >

                            <Camera className="h-3 w-3" />

                        </button>

                        <input

                            ref={fileInputRef}

                            type="file"

                            accept="image/*"

                            className="hidden"

                            onChange={handlePhotoChange}

                        />

                    </div>

                    <div className="flex-1">

                        <p className="font-medium">{profile.email}</p>

                        <p className="text-sm text-muted-foreground capitalize">

                            {profile.role}

                        </p>

                    </div>

                    {profile.photo_url && (

                        <Button

                            type="button"

                            variant="ghost"

                            size="icon"

                            onClick={handlePhotoDelete}

                            disabled={uploadingPhoto}

                        >

                            <Trash2 className="h-4 w-4 text-destructive" />

                        </Button>

                    )}

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