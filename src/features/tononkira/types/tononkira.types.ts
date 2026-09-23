import type { Database } from "@/types/database";

export type Tononkira = Database["public"]["Tables"]["tononkira"]["Row"];

export interface CreateTononkiraPayload {

    title: string;

    lyrics: string;

    audioFile?: File;

}

export interface UpdateTononkiraPayload {

    title?: string;

    lyrics?: string;

    audioFile?: File;

    removeAudio?: boolean;

}