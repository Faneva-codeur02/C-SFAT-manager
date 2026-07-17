import { MailX } from "lucide-react";

interface Props {
    hasFilters: boolean;
}

export default function InvitationEmptyState({
    hasFilters,
}: Props) {

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                py-20
                text-center
            "
        >

            <div
                className="
                    mb-4
                    rounded-full
                    bg-muted
                    p-5
                "
            >

                <MailX
                    className="
                        h-12
                        w-12
                        text-muted-foreground
                    "
                />

            </div>

            <h2
                className="
                    text-xl
                    font-semibold
                "
            >
                {
                    hasFilters
                        ? "Aucun résultat trouvé"
                        : "Aucun code d'invitation"
                }
            </h2>

            <p
                className="
                    mt-2
                    max-w-md
                    text-sm
                    text-muted-foreground
                "
            >

                {
                    hasFilters

                        ? "Essayez une autre recherche ou modifiez les filtres."

                        : "Commencez par générer votre premier code d'invitation."
                }

            </p>

        </div>

    );

}