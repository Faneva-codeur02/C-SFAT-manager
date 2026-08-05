import type { ComponentType } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type {

    CrudRepository,

    CrudFormProps,

    CrudFilters,

    BulkAction,

} from "../crud/types/crud.types";

export interface CrudConfig<

    TEntity,

    TCreate = TEntity,

    TUpdate = Partial<TCreate>

> {

    title: string;

    repository: CrudRepository<

        TEntity,

        TCreate,

        TUpdate

    >;

    columns: ColumnDef<TEntity>[];

    Form: ComponentType<

        CrudFormProps<

            TEntity,

            TCreate,

            TUpdate

        >

    >;

    filters?: CrudFilters[];

    bulkActions?: BulkAction<TEntity>[];

}