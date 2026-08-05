import { supabase } from "@/shared/lib/supabase";

import {

    unwrap,
    unwrapSingle,
    execute,

}

    from "@/shared/services/supabase-query";

import type {

    TablesInsert,
    TablesUpdate,

}

    from "@/types/database";

class ContributionRepository {

    async getAll() {

        return unwrap(

            supabase

                .from("member_contributions")

                .select(`
                    *,
                    profiles(
                        nom,
                        prenom,
                        member_number
                    ),
                    contribution_periods(
                        week_number,
                        due_date,
                        amount
                    )
                `)

                .order(

                    "created_at",

                    {

                        ascending: false,

                    }

                )

        );

    }

    async getById(id: string) {

        return unwrapSingle(

            supabase

                .from("member_contributions")

                .select(`
                    *,
                    profiles(
                        nom,
                        prenom,
                        member_number
                    ),
                    contribution_periods(
                        week_number,
                        due_date,
                        amount
                    )
                `)

                .eq("id", id)

                .single()

        );

    }

    async create(

        values: TablesInsert<"member_contributions">

    ) {

        return unwrapSingle(

            supabase

                .from("member_contributions")

                .insert(values)

                .select()

                .single()

        );

    }

    async update(

        id: string,

        values: TablesUpdate<"member_contributions">

    ) {

        return unwrapSingle(

            supabase

                .from("member_contributions")

                .update(values)

                .eq("id", id)

                .select()

                .single()

        );

    }

    async delete(id: string) {

        return execute(

            supabase

                .from("member_contributions")

                .delete()

                .eq("id", id)

        );

    }

    async getStats() {

        const rows = await this.getAll();

        const totalExpected =
            rows.reduce(

                (sum, row) =>

                    sum + row.amount_due,

                0

            );

        const totalPaid =
            rows.reduce(

                (sum, row) =>

                    sum + row.amount_paid,

                0

            );

        const remaining =
            totalExpected - totalPaid;

        const pendingCount =
            rows.filter(

                c => c.status !== "paid"

            ).length;

        return {

            totalExpected,

            totalPaid,

            remaining,

            pendingCount,

            paymentRate:

                totalExpected === 0

                    ? 0

                    : Math.round(

                        totalPaid

                        /

                        totalExpected

                        * 100

                    ),

        };

    }

}

export const contributionRepository = new ContributionRepository();