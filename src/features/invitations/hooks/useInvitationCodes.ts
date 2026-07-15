import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/shared/lib/supabase";

import type { InvitationWithCreator } from "@/types";

interface InvitationFilters {

    search: string;

}

export function useInvitationCodes(
    filters: InvitationFilters,
) {

    const [codes, setCodes] =
        useState<InvitationWithCreator[]>([]);

    const [loading, setLoading] =
        useState(true);

    const loadCodes =
        useCallback(async () => {

            setLoading(true);

            let query =
                supabase
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
                    `);

            if (filters.search) {

                query =
                    query.ilike(
                        "code",
                        `%${filters.search}%`
                    );

            }

            const { data, error } =
                await query.order(
                    "created_at",
                    {
                        ascending: false,
                    }
                );

            if (error) {

                console.error(error);

                setLoading(false);

                return;

            }

            setCodes(
                (data ?? []) as InvitationWithCreator[]
            );

            setLoading(false);

        }, [
            filters.search,
        ]);


    useEffect(() => {

        loadCodes();

    }, [
        loadCodes,
    ]);

    return {

        codes,

        loading,

        reload: loadCodes,

    };

}