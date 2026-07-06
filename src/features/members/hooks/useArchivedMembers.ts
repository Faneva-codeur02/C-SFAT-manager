import { useEffect, useState } from "react";

import {

    getArchivedMembers,

} from "../services/member.service";

export function useArchivedMembers() {

    const [members, setMembers] =

        useState([]);

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