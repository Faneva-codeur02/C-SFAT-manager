import {
    unwrap,
    unwrapSingle,
    execute,
} from "@/shared/services/supabase-query";

export abstract class BaseRepository {

    protected execute<T>(
        query: Parameters<
            typeof unwrap<T>
        >[0]
    ): Promise<T[]> {

        return unwrap(query);

    }

    protected executeSingle<T>(
        query: Parameters<
            typeof unwrapSingle<T>
        >[0]
    ): Promise<T> {

        return unwrapSingle(query);

    }

    protected executeVoid(
        query: Parameters<
            typeof execute
        >[0]
    ): Promise<void> {

        return execute(query);

    }

}