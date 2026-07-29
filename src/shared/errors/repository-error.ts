import type {

    PostgrestError,

} from "@supabase/supabase-js";

export class RepositoryError extends Error {

    readonly code?: string;

    readonly details?: string;

    constructor(
        message: string,
        code?: string,
        details?: string,
    ) {

        super(message);

        this.name = "RepositoryError";

        this.code = code;

        this.details = details;

    }

}

export function mapSupabaseError(

    error: PostgrestError

): RepositoryError {

    switch (error.code) {

        case "23505":

            return new RepositoryError(
                "Cet enregistrement existe déjà.",
                error.code,
                error.details ?? undefined
            );

        case "23503":

            return new RepositoryError(
                "Impossible de supprimer cet élément car il est utilisé ailleurs.",
                error.code,
                error.details ?? undefined
            );

        case "23502":

            return new RepositoryError(
                "Certaines informations obligatoires sont manquantes.",
                error.code,
                error.details ?? undefined
            );

        case "42501":

            return new RepositoryError(
                "Vous n'avez pas les droits nécessaires.",
                error.code,
                error.details ?? undefined
            );

        default:

            return new RepositoryError(
                error.message,
                error.code,
                error.details ?? undefined
            );

    }

}

export function normalizeRepositoryError(

    error: unknown

): never {

    if (

        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        "code" in error

    ) {

        throw mapSupabaseError(

            error as PostgrestError

        );

    }

    if (error instanceof Error) {

        throw new RepositoryError(error.message);

    }

    throw new RepositoryError(

        "Une erreur inconnue est survenue."

    );

}