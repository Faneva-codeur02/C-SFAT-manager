import { toast } from "sonner";

import {

    deleteInvitationsByIds,

    getInvitationCodesByIds,
    getInvitationsByIds,

} from "../services/bulk-invitation.service";

interface Props {

    reload(): Promise<void>;

    clear(): void;

}

export function useBulkInvitationActions({

    reload,

    clear,

}: Props) {

    async function remove(
        ids: string[],
    ) {

        try {

            await deleteInvitationsByIds(ids);

            toast.success(
                `${ids.length} code(s) supprimé(s).`
            );

            clear();

            await reload();

        } catch (error: any) {

            toast.error(
                error.message
            );

        }

    }

    async function copy(
        ids: string[],
    ) {

        try {

            const codes =
                await getInvitationCodesByIds(ids);

            await navigator.clipboard.writeText(

                codes.join("\n")

            );

            toast.success(

                `${codes.length} code(s) copiés.`

            );

        } catch (error: any) {

            toast.error(
                error.message
            );

        }

    }

    async function exportCSV(
        ids: string[],
    ) {

        const invitations =
            await getInvitationsByIds(ids);

        if (invitations.length === 0) {

            toast.error(
                "Aucun code sélectionné."
            );

            return;

        }

        const rows = [

            [

                "Code",

                "Statut",

                "Créé le",

                "Expire le",

                "Créé par",

            ],

            ...invitations.map(invitation => [

                invitation.code,

                invitation.used

                    ? "Utilisé"

                    : new Date(invitation.expires_at) < new Date()

                        ? "Expiré"

                        : "Valide",

                new Date(invitation.created_at)

                    .toLocaleDateString("fr-FR"),

                new Date(invitation.expires_at)

                    .toLocaleDateString("fr-FR"),

                (() => {

                    const creator =

                        Array.isArray(invitation.creator)

                            ? invitation.creator[0]

                            : invitation.creator;

                    return creator

                        ? `${creator.prenom} ${creator.nom}`

                        : "-";

                })(),

            ]),

        ];

        const csv =

            rows

                .map(row =>

                    row

                        .map(value => `"${value}"`)

                        .join(";")

                )

                .join("\n");

        const blob = new Blob(

            [csv],

            {

                type:

                    "text/csv;charset=utf-8;",

            }

        );

        const url =

            URL.createObjectURL(blob);

        const link =

            document.createElement("a");

        link.href = url;

        link.download =

            `codes-invitation-${Date.now()}.csv`;

        link.click();

        URL.revokeObjectURL(url);

    }

    return {

        remove,

        copy,

        exportCSV,

    };

}