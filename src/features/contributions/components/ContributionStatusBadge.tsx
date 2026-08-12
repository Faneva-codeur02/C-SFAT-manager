import { Badge } from "@/shared/components/ui/badge";
import type { ContributionStatus } from "../types/contribution.types";

type Props = {

    status: ContributionStatus;

    dueDate: string;

};

function isLate(status: ContributionStatus, dueDate: string): boolean {

    if (status === "paid" || status === "cancelled") {

        return false;

    }

    return new Date(dueDate) < new Date();

}

export default function ContributionStatusBadge({ status, dueDate }: Props) {

    if (status === "paid") {

        return <Badge>Payé</Badge>;

    }

    if (status === "partial") {

        return <Badge variant="secondary">Partiel</Badge>;

    }

    if (status === "cancelled") {

        return <Badge variant="outline">Annulé</Badge>;

    }

    return isLate(status, dueDate) ? (

        <Badge variant="destructive">En retard</Badge>

    ) : (

        <Badge variant="secondary">En attente</Badge>

    );

}