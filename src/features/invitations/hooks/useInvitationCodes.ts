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

interface InvitationPagination {

    page: number;

    pageSize: number;

}

export function useInvitationCodes(
    filters: InvitationFilters,

    pagination: InvitationPagination,
) {

    const [codes, setCodes] =
        useState<InvitationWithCreator[]>([]);

    const [total, setTotal] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const loadCodes =
        useCallback(async () => {

            setLoading(true);

            let query =
                supabase
                    .from("invitation_codes")
                    .select(
                        `
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
                        `,
                        {
                            count: "exact",
                        }
                    )

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

            const now =
                new Date().toISOString();

            if (filters.status === "used") {

                query = query.eq(
                    "used",
                    true
                );

            }

            if (filters.status === "valid") {

                query = query

                    .eq("used", false)

                    .gt(
                        "expires_at",
                        now
                    );

            }

            if (filters.status === "expired") {

                query = query

                    .eq("used", false)

                    .lte(
                        "expires_at",
                        now
                    );

            }

            query = query.order(

                sortMap[filters.sortBy],

                {

                    ascending:
                        filters.order === "asc",

                }

            );

            query = query.range(

                pagination.page * pagination.pageSize,

                pagination.page * pagination.pageSize +

                pagination.pageSize - 1

            )

            const {

                data,

                error,

                count,

            } = await query;

            if (error) {

                console.error(error);

                setLoading(false);

                return;

            }

            setCodes(
                (data ?? []) as InvitationWithCreator[]
            );

            setLoading(false);

            setTotal(

                count ?? 0

            );

        }, [

            filters.search,
            filters.status,
            filters.sortBy,
            filters.order,
            pagination.page,
            pagination.pageSize,

        ]);

    useEffect(() => {

        loadCodes();

    }, [

        loadCodes,

    ]);

    return {

        codes,

        total,

        loading,

        reload: loadCodes,

    };

}