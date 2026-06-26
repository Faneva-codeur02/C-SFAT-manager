import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface InvitationCode {
    id: string;
    code: string;
    is_used: boolean;
    expires_at: string;
    created_at: string;
}

export function useInvitationCodes() {
    const [codes, setCodes] = useState<InvitationCode[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadCodes() {
        const { data, error } = await supabase
            .from("invitation_codes")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) {
            setCodes(data ?? []);
        }

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