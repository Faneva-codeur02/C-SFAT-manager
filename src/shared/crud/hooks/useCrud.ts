import { useCallback, useEffect, useMemo, useState } from "react";

import type {

    CrudConfig,

} from "../CrudConfig";

import { notification } from "@/core/notifications/notification.service";

import { formatError } from "@/core/utils/formatError";

export function useCrud<

    TEntity,

    TCreate,

    TUpdate

>(

    config: CrudConfig<

        TEntity,

        TCreate,

        TUpdate

    >

) {
    const [items, setItems] =

        useState<TEntity[]>([]);

    const [loading, setLoading] =

        useState(true);

    const [refreshing, setRefreshing] =

        useState(false);

    const [error, setError] =

        useState<string | null>(null);

    const repository = config.repository;

    const load = useCallback(

        async () => {

            try {

                setLoading(true);

                setError(null);

                const data =

                    await repository.getAll();

                setItems(data);

            }

            catch (err) {

                setError(

                    formatError(err)

                );

            }

            finally {

                setLoading(false);

            }

        },

        [repository]

    );

    const refresh = useCallback(

        async () => {

            try {

                setRefreshing(true);

                const data =

                    await repository.getAll();

                setItems(data);

            }

            catch (err) {

                notification.error(

                    formatError(err)

                );

            }

            finally {

                setRefreshing(false);

            }

        },

        [repository]

    );

    const create = useCallback(

        async (

            values: TCreate

        ) => {

            const entity =

                await repository.create(values);

            setItems(current => [

                entity,

                ...current,

            ]);

            notification.success(

                "Créé avec succès."

            );

            return entity;

        },

        [repository]

    );

    const update = useCallback(

        async (

            id: string,

            values: TUpdate

        ) => {

            const entity =

                await repository.update(

                    id,

                    values,

                );

            setItems(current =>

                current.map(item =>

                    (item as { id: string }).id === id

                        ? entity

                        : item

                )

            );

            notification.success(

                "Modification enregistrée."

            );

            return entity;

        },

        [repository]

    );

    const remove = useCallback(

        async (

            id: string

        ) => {

            await repository.delete(id);

            setItems(current =>

                current.filter(

                    item =>

                        (item as { id: string }).id !== id

                )

            );

            notification.success(

                "Suppression effectuée."

            );

        },

        [repository]

    );

    useEffect(() => {

        void load();

    }, [load]);

    const isEmpty =

        useMemo(

            () =>

                !loading

                &&

                items.length === 0,

            [

                loading,

                items,

            ]

        );

    return {

        items,

        loading,

        refreshing,

        error,

        isEmpty,

        load,

        refresh,

        create,

        update,

        remove,

    };
}