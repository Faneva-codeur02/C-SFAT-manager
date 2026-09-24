
import { useState } from "react";

import { deleteTononkira } from "../services/tononkira.service";

export function useDeleteTononkira() {

    const [deleting, setDeleting] = useState(false);

    async function remove(id: string): Promise<boolean> {

        try {

            setDeleting(true);

            await deleteTononkira(id);

            return true;

        } catch {

            return false;

        } finally {

            setDeleting(false);

        }

    }

    return { remove, deleting };

}