import { toast } from "sonner";

import {
    deleteInvitationCode,
} from "../services/invitation.service";

export function useInvitationActions(
    reload: () => Promise<void>,
) {

    async function remove(id: string) {

        await deleteInvitationCode(id);

        toast.success(
            "Code supprimé."
        );

        await reload();

    }

    return {

        remove,

    };

}