import { useEffect, useState } from "react";

import {
    getContributionsByProfile,
} from "../services/contributions.service";
import type { MemberContributionWithDetails } from "../types/contribution.types";

export function useContributionsByProfile(profileId?: string) {

    const [contributions, setContributions] =
        useState<MemberContributionWithDetails[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!profileId) {

            setLoading(false);

            return;

        }

        loadContributions();

    }, [profileId]);

    async function loadContributions() {

        if (!profileId) return;

        try {
            setLoading(true);

            const result =
                await getContributionsByProfile(profileId);

            setContributions(result);

        } finally {

            setLoading(false);

        }

    }

    return {

        contributions,

        loading,

        loadContributions,

    };

}