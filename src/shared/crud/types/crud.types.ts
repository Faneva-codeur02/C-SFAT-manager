import type { ComponentType } from "react";
import type { ColumnDef } from "@tanstack/react-table";

export type CrudAction =
    | "create"
    | "update"
    | "delete"
    | "view";

export interface CrudRepository<

    TEntity,

    TCreate = TEntity,

    TUpdate = Partial<TCreate>

> {

    getAll(): Promise<TEntity[]>;

    getById(id: string): Promise<TEntity>;

    create(values: TCreate): Promise<TEntity>;

    update(

        id: string,

        values: TUpdate

    ): Promise<TEntity>;

    delete(id: string): Promise<void>;

}

export interface CrudPageProps<

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

}

export interface CrudFormProps<

    TEntity,

    TCreate,

    TUpdate

> {

    mode:

    | "create"

    | "update";

    initialValues?: TEntity;

    onSubmit(

        values:

            | TCreate

            | TUpdate

    ): Promise<void>;

    onSuccess(): void;

    onCancel(): void;

}

export interface CrudState<TEntity> {

    items: TEntity[];

    loading: boolean;

    refreshing: boolean;

    error: string | null;

}

export interface CrudDialogState<TEntity> {

    open: boolean;

    action:

    | "create"

    | "update"

    | "delete"

    | "view"

    | null;

    selected: TEntity | null;

}

export interface CrudFilters {

    search: string;

    page: number;

    pageSize: number;

    sortBy?: string;

    sortDirection?:

    | "asc"

    | "desc";

}

export interface BulkAction<TEntity> {

    id: string;

    label: string;

    icon?: React.ComponentType;

    action(

        rows: TEntity[]

    ): Promise<void>;

}