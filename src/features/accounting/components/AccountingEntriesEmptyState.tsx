import { Receipt } from "lucide-react";

export default function AccountingEntriesEmptyState() {

    return (

        <div className="flex flex-col items-center justify-center py-20">

            <Receipt
                className="mb-5 h-16 w-16 text-muted-foreground"
            />

            <h2 className="text-xl font-semibold">

                Aucune écriture trouvée

            </h2>

            <p className="mt-2 text-muted-foreground">

                Essayez de modifier votre recherche ou vos filtres.

            </p>

        </div>

    );

}