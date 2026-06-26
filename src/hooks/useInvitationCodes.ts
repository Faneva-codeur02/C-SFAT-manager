import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useInvitationCodes() {
    const [codes, setCodes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCodes();
    }, []);

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

    return {
        codes,
        loading,
        loadCodes,
    };
}