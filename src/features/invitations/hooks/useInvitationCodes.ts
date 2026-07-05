import { useEffect, useState } from "react";

import { supabase } from "@/shared/lib/supabase";

import type {
    InvitationWithCreator,
} from "@/types";

export function useInvitationCodes() {

    const [codes, setCodes] =
        useState<InvitationWithCreator[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function loadCodes() {

        const { data, error } =
            await supabase
                .from("invitation_codes")
                .select(`
            id,
            code,
            used,
            used_by,
            expires_at,
            created_at,
            created_by,
            creator:profiles!invitation_codes_created_by_fkey(
                id,
                nom,
                prenom
            )
        `)
                .order("created_at", {
                    ascending: false,
                });

        if (error) {

            console.error(error);

            return;

        }

        setCodes(
            (data ?? []) as InvitationWithCreator[]
        );

        setLoading(false);

    }

    useEffect(() => {

        loadCodes();

    }, []);

    return {

        codes,

        loading,

        reload: loadCodes,

    };

}