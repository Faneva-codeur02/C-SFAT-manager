import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { supabase } from "@/shared/lib/supabase";

import type {
    InvitationWithCreator,
} from "@/types";

import type {
    InvitationFilters
} from "../types/invitation-filter";

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

            // =====================
            // Recherche
            // =====================

            if (filters.search) {

                query = query.ilike(
                    "code",
                    `%${filters.search}%`
                );

            }



            const sortMap = {

                createdAt: "created_at",

                expiresAt: "expires_at",

                code: "code",

            };

            query = query.order(

                sortMap[filters.sortBy],

                {

                    ascending:
                        filters.order === "asc",

                }

            );

            const {

                data,

                error,

            } = await query;

            if (error) {

                console.error(error);

                setLoading(false);

                return;

            }

            let result =
                (data ?? []) as InvitationWithCreator[];

            // =====================
            // Filtre statut
            // =====================

            const now =
                new Date();

            switch (filters.status) {

                case "valid":

                    result = result.filter(code =>

                        !code.used &&
                        new Date(code.expires_at) > now

                    );

                    break;

                case "used":

                    result = result.filter(code =>

                        code.used

                    );

                    break;

                case "expired":

                    result = result.filter(code =>

                        !code.used &&
                        new Date(code.expires_at) <= now

                    );

                    break;

                default:

                    break;

            }

            setCodes(result);

            setLoading(false);

        }, [

            filters.search,
            filters.status,
            filters.sortBy,
            filters.order,

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