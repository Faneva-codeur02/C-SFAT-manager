import type { PostgrestError } from "@supabase/supabase-js";

export interface SupabaseQueryResult<T> {
    data: T | null;
    error: PostgrestError | null;
}

export async function unwrap<T>(
    query: PromiseLike<SupabaseQueryResult<T[]>>
): Promise<T[]> {
    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];
}

export async function unwrapSingle<T>(
    query: PromiseLike<SupabaseQueryResult<T>>
): Promise<T> {
    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    if (data === null) {
        throw new Error("Aucune donnée trouvée.");
    }

    return data;
}

export async function execute(
    query: PromiseLike<{
        data?: unknown;
        error: PostgrestError | null;
    }>
): Promise<void> {
    const { error } = await query;

    if (error) {
        throw new Error(error.message);
    }
}