import { useEffect, useState } from "react";

import { getPendingMembers } from "@/services/members/member.service";
import type { Profile } from "@/types";

export function usePendingMembers() {

    const [members, setMembers] =
        useState<Profile[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function load() {

            try {

                const members =
                    await getPendingMembers();

                setMembers(members);

            } catch (error) {

                console.error(
                    "Erreur lors du chargement des membres :",
                    error
                );

            } finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    return {

        members,

        loading,

    };

}