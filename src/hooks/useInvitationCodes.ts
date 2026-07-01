import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type InvitationCode =
    Database["public"]["Tables"]["invitation_codes"]["Row"];

export function useInvitationCodes() {

    const [codes, setCodes] =
        useState<InvitationCode[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function loadCodes() {

        const { data, error } =
            await supabase
                .from("invitation_codes")
                .select("*")
                .order("created_at", {
                    ascending: false,
                });

        if (error) {

            console.error(error);

            return;

        }

        setCodes(data ?? []);

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