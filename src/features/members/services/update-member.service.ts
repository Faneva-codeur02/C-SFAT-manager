import { supabase } from "@/shared/lib/supabase";

import type {
    UserRole,
    VoicePart,
} from "@/types";

export async function updateMember(

    id: string,

    data: {

        nom: string;

        prenom: string;

        email: string;

        telephone: string;

        role: UserRole;

        voice_part: VoicePart;

        date_entree: string;

    }

) {

    const { error } = await supabase

        .from("profiles")

        .update({

            nom: data.nom,

            prenom: data.prenom,

            email: data.email,

            telephone: data.telephone,

            role: data.role,

            voice_part: data.voice_part,

            date_entree: data.date_entree,

        })

        .eq("id", id);

    if (error) {

        throw error;

    }

}