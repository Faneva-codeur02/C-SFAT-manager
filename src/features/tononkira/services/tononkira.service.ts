import { supabase } from "@/shared/lib/supabase";

import type { Tononkira } from "../types/tononkira.types";
import type { TononkiraFilters, TononkiraPagination } from "../types/tononkira-filter";

import type { CreateTononkiraPayload, UpdateTononkiraPayload } from "../types/tononkira.types";

import type { Database } from "@/types/database";

export async function getTononkiraList(
    filters: TononkiraFilters,
    pagination: TononkiraPagination,
) {

    let query = supabase
        .from("tononkira")
        .select("*", { count: "exact" });

    if (filters.search) {

        query = query.ilike("title", `%${filters.search.trim()}%`);

    }

    query = query

        .order("title", { ascending: true })

        .range(

            pagination.page * pagination.pageSize,

            pagination.page * pagination.pageSize + pagination.pageSize - 1,

        );

    const { data, error, count } = await query;

    if (error) {
        throw error;
    }

    return {

        songs: data ?? [],

        total: count ?? 0,

    };

}

export async function getTononkiraById(id: string): Promise<Tononkira | null> {

    const { data, error } = await supabase
        .from("tononkira")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;

}

export async function getAudioSignedUrl(

    path: string,

    expiresIn = 3600,

): Promise<string | null> {

    const { data, error } = await supabase.storage

        .from("tononkira-audio")

        .createSignedUrl(path, expiresIn);

    if (error) {

        return null;

    }

    return data.signedUrl;

}

async function uploadAudio(songId: string, file: File): Promise<string> {

    const ext = file.name.split(".").pop();

    const path = `${songId}/audio.${ext}`;

    const { data: existingFiles } = await supabase.storage

        .from("tononkira-audio")

        .list(songId);

    if (existingFiles && existingFiles.length > 0) {

        await supabase.storage

            .from("tononkira-audio")

            .remove(existingFiles.map((f) => `${songId}/${f.name}`));

    }

    const { error } = await supabase.storage

        .from("tononkira-audio")

        .upload(path, file, { upsert: true });

    if (error) {
        throw error;
    }

    return path;

}

export async function createTononkira(
    payload: CreateTononkiraPayload,
): Promise<Tononkira> {

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("tononkira")
        .insert({

            title: payload.title,

            lyrics: payload.lyrics,

            created_by: user?.id ?? null,

        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    if (payload.audioFile) {

        const path = await uploadAudio(data.id, payload.audioFile);

        const { data: updated, error: updateError } = await supabase
            .from("tononkira")
            .update({ audio_path: path })
            .eq("id", data.id)
            .select()
            .single();

        if (updateError) {
            throw updateError;
        }

        return updated;

    }

    return data;

}

export async function updateTononkira(
    id: string,
    payload: UpdateTononkiraPayload,
): Promise<Tononkira> {

    const updates: Database["public"]["Tables"]["tononkira"]["Update"] = {};

    if (payload.title !== undefined) updates.title = payload.title;

    if (payload.lyrics !== undefined) updates.lyrics = payload.lyrics;

    if (payload.removeAudio) {

        const current = await getTononkiraById(id);

        if (current?.audio_path) {

            await supabase.storage.from("tononkira-audio").remove([current.audio_path]);

        }

        updates.audio_path = null;

    } else if (payload.audioFile) {

        updates.audio_path = await uploadAudio(id, payload.audioFile);

    }

    const { data, error } = await supabase
        .from("tononkira")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function deleteTononkira(id: string): Promise<void> {

    const current = await getTononkiraById(id);

    if (current?.audio_path) {

        await supabase.storage.from("tononkira-audio").remove([current.audio_path]);

    }

    const { error } = await supabase.from("tononkira").delete().eq("id", id);

    if (error) {
        throw error;
    }

}