import { toast } from "sonner";

import {

    bulkDeactivate,

    bulkReactivate,

    bulkArchive,

} from "../services/bulk-member.service";

export function useBulkMemberActions(

    reload: () => Promise<void>,

    clearSelection: () => void,

) {

    async function deactivate(ids: string[]) {

        if (!ids.length) return;

        await bulkDeactivate(ids);

        toast.success("Membres désactivés.");

        clearSelection();

        await reload();

    }

    async function reactivate(ids: string[]) {

        if (!ids.length) return;

        await bulkReactivate(ids);

        toast.success("Membres réactivés.");

        clearSelection();

        await reload();

    }

    async function archive(ids: string[]) {

        if (!ids.length) return;

        await bulkArchive(ids);

        toast.success("Membres archivés.");

        clearSelection();

        await reload();

    }

    return {

        deactivate,

        reactivate,

        archive,

    };

}