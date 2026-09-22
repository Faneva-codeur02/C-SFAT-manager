import { supabase } from "@/shared/lib/supabase";

import type {
    Profile,
    ProfileUpdate,
} from "@/types";

import { uploadAvatar } from "./avatar.service";

export class ProfileService {

    static async getById(
        id: string
    ): Promise<Profile | null> {

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) {
            console.error("Erreur ProfileService.getById:", error.message);
            return null;
        }

        return data;
    }

    static async update(
        id: string,
        values: ProfileUpdate
    ) {

        const { error } = await supabase
            .from("profiles")
            .update(values)
            .eq("id", id);

        if (error)
            throw error;

    }

    static async ensureProfileExists(

        userId: string,

        email: string,

        fullName?: string,

        avatarUrl?: string,

    ) {

        const existing = await ProfileService.getById(userId);

        if (existing) {

            return existing;

        }

        const [prenom, ...rest] = (fullName ?? "").trim().split(" ");

        const { data, error } = await supabase
            .from("profiles")
            .insert({

                id: userId,

                email,

                nom: rest.length > 0 ? rest.join(" ") : "Utilisateur",

                prenom: prenom || "Google",

                role: "member",

                status: "pending",

            })
            .select()
            .single();

        if (error) {

            throw error;

        }

        if (avatarUrl) {

            await ProfileService.importAvatarFromUrl(userId, avatarUrl);

        }

        return data;

    }

    static async importAvatarFromUrl(userId: string, avatarUrl: string) {

        try {

            const response = await fetch(avatarUrl);

            if (!response.ok) return;

            const blob = await response.blob();

            const ext = blob.type.split("/")[1] ?? "jpg";

            const file = new File([blob], `avatar.${ext}`, { type: blob.type });

            const path = await uploadAvatar(userId, file);

            await supabase

                .from("profiles")

                .update({ photo_url: path })

                .eq("id", userId);

        } catch {

            // Pas grave si l'import échoue — le membre pourra uploader
            // sa propre photo depuis "Mon profil"

        }

    }
}