import { toast } from "sonner";

import {
    deactivateMember,
    reactivateMember,
} from "../services/deactivate-member.service";

import type { Profile } from "@/types";

export function useMemberActions(
    reload: () => Promise<void>,
    closeDialog: () => void,
) {

    async function toggleStatus(
        member: Profile,
    ) {

        if (member.status === "active") {

            await deactivateMember(
                member.id
            );

            toast.success(
                "Membre désactivé."
            );

        } else {

            await reactivateMember(
                member.id
            );

            toast.success(
                "Membre réactivé."
            );

        }

        await reload();

        closeDialog();

    }

    return {

        toggleStatus,

    };

}