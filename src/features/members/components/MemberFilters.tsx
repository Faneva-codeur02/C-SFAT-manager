import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import type {
    MemberStatus,
    VoicePart,
} from "@/types";
import type { MemberSort } from "../types/member-filter";

interface Props {

    status?: MemberStatus;

    voicePart?: VoicePart;

    sortBy?: MemberSort;

    onStatusChange(
        value: MemberStatus | undefined
    ): void;

    onVoicePartChange(
        value: VoicePart | undefined
    ): void;

    onSortChange(
        value: MemberSort
    ): void;

}

export default function MemberFilters({

    status,

    voicePart,

    sortBy,

    onStatusChange,

    onVoicePartChange,

    onSortChange,

}: Props) {

    return (

        <div className="mb-6 flex flex-wrap gap-4">

            <Select
                value={status ?? "all"}
                onValueChange={(value) =>
                    onStatusChange(
                        value === "all"
                            ? undefined
                            : value as MemberStatus
                    )
                }
            >

                <SelectTrigger className="w-48">

                    <SelectValue placeholder="Statut" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        Tous les statuts
                    </SelectItem>

                    <SelectItem value="active">
                        Actif
                    </SelectItem>

                    <SelectItem value="pending">
                        En attente
                    </SelectItem>

                    <SelectItem value="inactive">
                        Désactivé
                    </SelectItem>

                    <SelectItem value="rejected">
                        Refusé
                    </SelectItem>

                </SelectContent>

            </Select>

            <Select
                value={voicePart ?? "all"}
                onValueChange={(value) =>
                    onVoicePartChange(
                        value === "all"
                            ? undefined
                            : value as VoicePart
                    )
                }
            >

                <SelectTrigger className="w-48">

                    <SelectValue placeholder="Pupitre" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        Tous les pupitres
                    </SelectItem>

                    <SelectItem value="soprano">
                        Soprano
                    </SelectItem>

                    <SelectItem value="alto">
                        Alto
                    </SelectItem>

                    <SelectItem value="tenor">
                        Ténor
                    </SelectItem>

                    <SelectItem value="bass">
                        Basse
                    </SelectItem>

                </SelectContent>

            </Select>

            <Select
                value={sortBy ?? "nom"}
                onValueChange={(value) =>
                    onSortChange(value as MemberSort)
                }
            >

                <SelectTrigger className="w-48">

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="name">
                        Nom
                    </SelectItem>

                    <SelectItem value="firstname">
                        Prénom
                    </SelectItem>

                    <SelectItem value="registrationDate">
                        Date d'inscription
                    </SelectItem>

                </SelectContent>

            </Select>

        </div>

    );

}