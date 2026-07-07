import { useEffect, useState } from "react";
import type { Profile } from "@/types";

import {

    getArchivedMembers,

} from "../services/member.service";

export function useArchivedMembers() {

    const [members, setMembers] =
        useState<Profile[]>([]);

    const [loading, setLoading] =

        useState(true);

    useEffect(() => {

        loadMembers();

    }, []);

    async function loadMembers() {

        try {

            const data =

                await getArchivedMembers();

            setMembers(data);

        }

        finally {

            setLoading(false);

        }

    }

    return {

        members,

        loading,

        loadMembers,

    };

}