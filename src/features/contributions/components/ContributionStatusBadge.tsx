import { Badge } from "@/shared/components/ui/badge";

import type { Enums } from "@/types/database";

type PaymentStatus = Enums<"payment_status">;

interface Props {

    status: PaymentStatus;

}

export default function ContributionStatusBadge({

    status,

}: Props) {

    switch (status) {

        case "paid":

            return (

                <Badge
                    className="
                        bg-green-500/10
                        text-green-600
                        border-green-500/20
                    "
                >

                    Payé

                </Badge>

            );

        case "partial":

            return (

                <Badge
                    className="
                        bg-orange-500/10
                        text-orange-600
                        border-orange-500/20
                    "
                >

                    Partiel

                </Badge>

            );

        case "pending":

            return (

                <Badge
                    className="
                        bg-red-500/10
                        text-red-600
                        border-red-500/20
                    "
                >

                    En attente

                </Badge>

            );

        case "cancelled":

            return (

                <Badge
                    variant="secondary"
                >

                    Annulé

                </Badge>

            );

    }

}