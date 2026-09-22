import { supabase } from "@/shared/lib/supabase";

export async function uploadAvatar(
    userId: string,
    file: File,
): Promise<string> {

    const ext = file.name.split(".").pop();

    const path = `${userId}/avatar.${ext}`;

    // Supprime l'ancien fichier s'il existe sous un autre nom/extension
    const { data: existingFiles } = await supabase.storage

        .from("avatars")

        .list(userId);

    if (existingFiles && existingFiles.length > 0) {

        await supabase.storage

            .from("avatars")

            .remove(existingFiles.map((f) => `${userId}/${f.name}`));

    }

    const { error } = await supabase.storage

        .from("avatars")

        .upload(path, file, { upsert: true });

    if (error) {

        throw error;

    }

    return path;

}

export async function deleteAvatar(path: string): Promise<void> {

    const { error } = await supabase.storage

        .from("avatars")

        .remove([path]);

    if (error) {

        throw error;

    }

}

export async function getAvatarSignedUrl(

    path: string,

    expiresIn = 3600,

): Promise<string | null> {

    const { data, error } = await supabase.storage

        .from("avatars")

        .createSignedUrl(path, expiresIn);

    if (error) {

        return null;

    }

    return data.signedUrl;

}