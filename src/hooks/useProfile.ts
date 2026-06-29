import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types/profile";

export function useProfile(userId?: string) {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        if (!userId) return;

        async function loadProfile() {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                console.error(error);
                return;
            }

            setProfile(data as Profile);
        }

        loadProfile();
    }, [userId]);

    return profile;
}