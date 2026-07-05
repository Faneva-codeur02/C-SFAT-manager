import { useEffect, useState } from "react";
import {
    getMembers,
} from "../services/member.service";

export function useMembers() {
    const [members, setMembers] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadMembers();
    }, []);

    async function loadMembers() {

        try {

            const members =
                await getMembers();

            setMembers(members);

        } finally {

            setLoading(false);

        }

    }

    return {
        members,
        loading,
        loadMembers,
    };
}