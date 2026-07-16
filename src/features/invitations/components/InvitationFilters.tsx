import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import type {
    InvitationStatus,
} from "../types/invitation-filter";

interface Props {

    status: InvitationStatus;

    onStatusChange(
        value: InvitationStatus
    ): void;

}

export default function InvitationFilters({

    status,

    onStatusChange,

}: Props) {

    return (

        <Select

            value={status}

            onValueChange={value =>

                onStatusChange(
                    value as InvitationStatus
                )

            }

        >

            <SelectTrigger
                className="w-48"
            >

                <SelectValue />

            </SelectTrigger>

            <SelectContent>

                <SelectItem value="all">

                    Tous les codes

                </SelectItem>

                <SelectItem value="valid">

                    Valides

                </SelectItem>

                <SelectItem value="used">

                    Utilisés

                </SelectItem>

                <SelectItem value="expired">

                    Expirés

                </SelectItem>

            </SelectContent>

        </Select>

    );

}