import { useEffect, useState } from "react";

import {
    getPendingMembers,
} from "@/features/auth/services/member.service";
import type { Profile } from "@/types";

export function usePendingMembers() {

    const [members, setMembers] =
        useState<Profile[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function load() {

        try {

            const members =
                await getPendingMembers();

            setMembers(members);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        load();

    }, []);

    return {

        members,

        loading,

        reload: load,

    };

}