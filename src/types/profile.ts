import type { Role } from "./roles";

export interface Profile {
    id: string;
    nom: string;
    prenom: string;
    telephone: string | null;
    adresse: string | null;
    date_naissance: string | null;
    photo_url: string | null;
    pupitre: string | null;
    statut: string;
    role: Role;
    created_at: string;
}