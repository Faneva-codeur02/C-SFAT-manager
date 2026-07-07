import { toast } from "sonner";

import {
    deactivateMember,
    reactivateMember,
} from "../services/deactivate-member.service";

import type { Profile } from "@/types";

import { archiveMember } from "../services/archive-member.service";

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

    async function archive(member: Profile) {

        await archiveMember(member.id);

        toast.success("Membre archivé.");

        await reload();

    }

    return {

        toggleStatus,
        archive,

    };

}