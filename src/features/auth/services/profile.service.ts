import { supabase } from "@/shared/lib/supabase";

import type {
    Profile,
    ProfileUpdate,
} from "@/types";

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

    static async ensureProfileExists(userId: string, email: string, fullName?: string) {

        const existing = await ProfileService.getById(userId);

        if (existing) {

            return existing;

        }

        const [prenom, ...rest] = (fullName ?? "").trim().split(" ");

        const nom = rest.join(" ") || prenom || "Utilisateur";

        const { data, error } = await supabase
            .from("profiles")
            .insert({

                id: userId,

                email,

                nom: rest.length > 0 ? nom : "Utilisateur",

                prenom: prenom || "Google",

                role: "member",

                status: "pending",

            })
            .select()
            .single();

        if (error) {

            throw error;

        }

        return data;

    }

}