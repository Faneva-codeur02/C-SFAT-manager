import type {

    PostgrestResponse,
    PostgrestSingleResponse,

} from "@supabase/supabase-js";

export async function unwrap<T>(

    query: PromiseLike<PostgrestResponse<T>>

): Promise<T[]> {

    const {

        data,

        error,

    } = await query;

    if (error) {

        throw new Error(error.message);

    }

    return data ?? [];

}

export async function unwrapSingle<T>(

    query: PromiseLike<PostgrestSingleResponse<T>>

): Promise<T> {

    const {

        data,

        error,

    } = await query;

    if (error) {

        throw new Error(error.message);

    }

    return data;

}

export async function execute(

    query: PromiseLike<{ error: Error | null }>

): Promise<void> {

    const {

        error,

    } = await query;

    if (error) {

        throw new Error(error.message);

    }

}