import { supabase } from "@/lib/supabase";

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
            .single();

        if (error) {
            console.error(
                "Erreur ProfileService.getById:",
                error.message
            );
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

}