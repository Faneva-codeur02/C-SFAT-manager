import ConfirmDeleteDialog
    from "@/shared/components/dialogs/ConfirmDeleteDialog";

import type {

    CrudFormProps,

} from "../types/crud.types";

import type {

    ComponentType,

} from "react";

interface Props<

    TEntity,

    TCreate,

    TUpdate

> {

    crud: {

        create(

            values: TCreate

        ): Promise<TEntity>;

        update(

            id: string,

            values: TUpdate

        ): Promise<TEntity>;

        remove(

            id: string

        ): Promise<void>;

    };

    dialogs: {

        open: boolean;

        action:

        | "create"

        | "update"

        | "delete"

        | "view"

        | null;

        selected: TEntity | null;

        close(): void;

    };

    Form: ComponentType<

        CrudFormProps<

            TEntity,

            TCreate,

            TUpdate

        >

    >;

    getEntityId(

        entity: TEntity

    ): string;

    getEntityLabel?(
        entity: TEntity
    ): string;

}

export default function CrudDialogs<

    TEntity,

    TCreate,

    TUpdate

>({
    crud,
    dialogs,
    Form,
    getEntityId,
    getEntityLabel,
}: Props<
    TEntity,
    TCreate,
    TUpdate
>) {
    if (dialogs.action === "create") {

        return (

            <Form
                mode="create"
                onSubmit={async (values) => {
                    await crud.create(values as TCreate);
                }}
                onSuccess={dialogs.close}
                onCancel={dialogs.close}
            />
        );

    }

    if (
        dialogs.action === "update" &&
        dialogs.selected
    ) {
        const entity = dialogs.selected;

        return (
            <Form
                mode="update"
                initialValues={entity}
                onSubmit={async (values) => {
                    await crud.update(
                        getEntityId(entity),
                        values as TUpdate
                    );
                }}
                onSuccess={dialogs.close}
                onCancel={dialogs.close}
            />
        );
    }

    if (
        dialogs.action === "delete" &&
        dialogs.selected
    ) {
        const entity = dialogs.selected;

        return (
            <ConfirmDeleteDialog
                open={dialogs.open}
                onOpenChange={(open) => {
                    if (!open) dialogs.close();
                }}
                title="Confirmer la suppression"
                description={
                    getEntityLabel
                        ? `Supprimer « ${getEntityLabel(entity)} » ?`
                        : "Cette action est irréversible."
                }
                onConfirm={async () => {
                    await crud.remove(
                        getEntityId(entity)
                    );
                }}
            />
        );
    }

    if (

        dialogs.action === "view"

    ) {

        return null;

    }

    return null;


}