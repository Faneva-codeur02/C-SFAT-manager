import { useState } from "react";

import { deleteEvent } from "../services/events.service";

export function useDeleteEvent() {

    const [deleting, setDeleting] =
        useState(false);

    async function remove(id: string): Promise<boolean> {

        try {

            setDeleting(true);

            await deleteEvent(id);

            return true;

        } catch {

            return false;

        } finally {

            setDeleting(false);

        }

    }

    return {

        remove,

        deleting,

    };

}