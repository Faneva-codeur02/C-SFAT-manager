import { useEffect, useState } from "react";

import { supabase } from "@/shared/lib/supabase";

interface InvitationStats {

    total: number;

    valid: number;

    used: number;

    expired: number;

}

export function useInvitationStats() {

    const [stats, setStats] =
        useState<InvitationStats>({

            total: 0,

            valid: 0,

            used: 0,

            expired: 0,

        });

    const [loading, setLoading] =
        useState(true);

    async function loadStats() {

        setLoading(true);

        const now =
            new Date().toISOString();

        const [

            total,

            valid,

            used,

            expired,

        ] = await Promise.all([

            supabase
                .from("invitation_codes")
                .select("*", {
                    count: "exact",
                    head: true,
                }),

            supabase
                .from("invitation_codes")
                .select("*", {
                    count: "exact",
                    head: true,
                })
                .eq("used", false)
                .gt("expires_at", now),

            supabase
                .from("invitation_codes")
                .select("*", {
                    count: "exact",
                    head: true,
                })
                .eq("used", true),

            supabase
                .from("invitation_codes")
                .select("*", {
                    count: "exact",
                    head: true,
                })
                .eq("used", false)
                .lte("expires_at", now),

        ]);

        setStats({

            total: total.count ?? 0,

            valid: valid.count ?? 0,

            used: used.count ?? 0,

            expired: expired.count ?? 0,

        });

        setLoading(false);

    }

    useEffect(() => {

        loadStats();

    }, []);

    return {

        ...stats,

        loading,

        reload: loadStats,

    };

}