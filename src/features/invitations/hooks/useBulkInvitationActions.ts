import { supabase } from "@/shared/lib/supabase";

import { toast } from "sonner";

import type {
    InvitationWithCreator,
} from "@/types";

interface Props {

    reload(): Promise<void>;

    clear(): void;

}

export function useBulkInvitationActions({

    reload,

    clear,

}: Props) {

    async function remove(

        ids: string[]

    ) {

        const { error } = await supabase

            .from("invitation_codes")

            .delete()

            .in("id", ids);

        if (error) {

            toast.error(error.message);

            return;

        }

        toast.success(

            "Codes supprimés."

        );

        clear();

        await reload();

    }

    async function copy(

        codes: InvitationWithCreator[],

        ids: string[]

    ) {

        const text =

            codes

                .filter(code =>

                    ids.includes(code.id)

                )

                .map(code => code.code)

                .join("\n");

        await navigator.clipboard.writeText(text);

        toast.success(

            "Codes copiés."

        );

    }

    function exportCSV(

        codes: InvitationWithCreator[],

        ids: string[]

    ) {

        console.log(

            "Export CSV",

            codes.filter(code =>

                ids.includes(code.id)

            )

        );

    }

    return {

        remove,

        copy,

        exportCSV,

    };

}