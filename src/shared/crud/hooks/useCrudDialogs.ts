import { useCallback, useState } from "react";

import type {

    CrudAction,

    CrudDialogState,

} from "../types/crud.types";

export function useCrudDialogs<TEntity>() {
    const [state, setState] =

        useState<CrudDialogState<TEntity>>({

            open: false,

            action: null,

            selected: null,

        });

    const openCreate = useCallback(() => {

        setState({

            open: true,

            action: "create",

            selected: null,

        });

    }, []);

    const openEdit = useCallback(

        (entity: TEntity) => {

            setState({

                open: true,

                action: "update",

                selected: entity,

            });

        },

        []

    );

    const openView = useCallback(

        (entity: TEntity) => {

            setState({

                open: true,

                action: "view",

                selected: entity,

            });

        },

        []

    );

    const openDelete = useCallback(

        (entity: TEntity) => {

            setState({

                open: true,

                action: "delete",

                selected: entity,

            });

        },

        []

    );

    const close = useCallback(() => {

        setState({

            open: false,

            action: null,

            selected: null,

        });

    }, []);

    return {

        ...state,

        openCreate,

        openEdit,

        openView,

        openDelete,

        close,

    };
}