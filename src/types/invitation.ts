import type { Database } from "./database";

export type InvitationCode =
    Database["public"]["Tables"]["invitation_codes"]["Row"];

export type InvitationCodeInsert =
    Database["public"]["Tables"]["invitation_codes"]["Insert"];

export type InvitationCodeUpdate =
    Database["public"]["Tables"]["invitation_codes"]["Update"];