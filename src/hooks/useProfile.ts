import {
    useEffect,
    useState,
} from "react";

import { supabase } from "@/lib/supabase";

export function useProfile(
    userId?: string
) {
    const [profile, setProfile] =
        useState<any>(null);

    useEffect(() => {
        if (!userId) return;

        async function loadProfile() {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            console.log("Data:", data);
            console.log("Error:", error);

            setProfile(data);
        }
        loadProfile();
    }, [userId]);

    return profile;
}