import { useEffect, useState } from "react";

import { ProfileService } from "@/services/profile/profile.service";
import type { Profile } from "@/types";

export function useProfile(userId?: string) {

    const [profile, setProfile] =
        useState<Profile | null>(null);

    useEffect(() => {

        if (!userId) {
            setProfile(null);
            return;
        }

        const id = userId;

        async function loadProfile() {

            const data = await ProfileService.getById(id);

            setProfile(data);

        }

        loadProfile();

    }, [userId]);

    return profile;

}