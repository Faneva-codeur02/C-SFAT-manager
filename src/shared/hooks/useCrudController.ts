import {

    useCallback,
    useEffect,
    useState,

} from "react";

import { useConfirmAction } from "./useConfirmAction";

import { crudMessages }

    from "@/shared/utils/crudMessages";

interface CrudService<T> {

    load(): Promise<T[]>;

    remove(id: string): Promise<void>;

}

interface CrudControllerOptions<T extends { id: string }> {

    service: CrudService<T>;

    entity: string;

}

export function useCrudController<

    T extends { id: string }

>(
    options: CrudControllerOptions<T>

) {
    const [items, setItems] =
        useState<T[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const deleteDialog =
        useConfirmAction<T>();

    const refresh = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const data =
                await options.service.load();

            setItems(data);

        }

        catch {

            setError(

                "Impossible de charger les données."

            );

        }

        finally {

            setLoading(false);

        }

    }, [options]);

    useEffect(() => {

        refresh();

    }, [refresh]);

    const remove = useCallback(async () => {

        await deleteDialog.execute(

            async (item) => {

                await options.service.remove(item.id);

            },

            {

                ...crudMessages(

                    options.entity

                ).delete,

                onSuccess: refresh,

            }

        );

    }, [

        deleteDialog,

        options,

        refresh,

    ]);

    return {

        items,

        loading,

        error,

        refresh,

        remove,

        deleteDialog,

    };

}