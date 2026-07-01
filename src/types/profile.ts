import type { Database } from "./database";

export type Profile =
    Database["public"]["Tables"]["profiles"]["Row"];

export type ProfileInsert =
    Database["public"]["Tables"]["profiles"]["Insert"];

export type ProfileUpdate =
    Database["public"]["Tables"]["profiles"]["Update"];

export type UserRole =
    Database["public"]["Enums"]["user_role"];

export type MemberStatus =
    Database["public"]["Enums"]["member_status"];

export type VoicePart =
    Database["public"]["Enums"]["voice_part"];