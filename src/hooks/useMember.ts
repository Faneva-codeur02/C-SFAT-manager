import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useMembers() {
    const [members, setMembers] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadMembers();
    }, []);

    async function loadMembers() {
        const { data } = await supabase
            .from("profiles")
            .select("*")
            .order("nom");

        setMembers(data || []);
        setLoading(false);
    }

    return {
        members,
        loading,
        loadMembers,
    };
}