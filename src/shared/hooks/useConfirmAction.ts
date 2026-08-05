import { useCallback, useState } from "react";

import { notification }

    from "../../core/notifications/notification.service";


interface ConfirmActionOptions {

    loadingMessage?: string;

    successMessage?: string;

    errorMessage?: string;

    onSuccess?(): void;

    onError?(error: unknown): void;

}

export function useConfirmAction<T>() {

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [selected, setSelected] =
        useState<T | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    const confirm = useCallback((item: T) => {

        setSelected(item);

        setError(null);

        setOpen(true);

    }, []);

    const close = useCallback(() => {

        if (!loading) {

            setOpen(false);

        }

    }, [loading]);

    const clear = useCallback(() => {

        setLoading(false);

        setOpen(false);

        setSelected(null);

        setError(null);

    }, []);

    const execute = useCallback(

        async (

            action: (item: T) => Promise<void>,

            options?: ConfirmActionOptions,

        ) => {

            if (!selected) {

                return;

            }

            setLoading(true);

            setError(null);

            const toastId = notification.loading(

                options?.loadingMessage ?? "Traitement..."

            );

            try {

                await action(selected);

                notification.dismiss(toastId);

                notification.success(

                    options?.successMessage ??

                    "Opération réussie."

                );
                options?.onSuccess?.();
                clear();

            } catch (err) {

                console.error(err);

                notification.dismiss(toastId);

                notification.error(

                    options?.errorMessage ??

                    "Une erreur est survenue."

                );

                setError(

                    err instanceof Error

                        ? err.message

                        : "Une erreur est survenue."

                );

                options?.onError?.(err);

            } finally {

                setLoading(false);

            }

        },

        [selected, clear]

    );

    return {

        open,

        loading,

        error,

        selected,

        confirm,

        close,

        clear,

        execute,

    };

}