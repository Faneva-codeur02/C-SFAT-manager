import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";

import MemberInfoItem
    from "../components/MemberInfoItem";

import type { Profile } from "@/types";

interface Props {
    member: Profile;
}

export default function MemberChoirCard({
    member,
}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Informations chorale

                </CardTitle>

            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-5">

                <MemberInfoItem
                    label="Date d'entrée"
                    value={member.date_entree}
                />

                <MemberInfoItem
                    label="Validé le"
                    value={member.validated_at}
                />

                <MemberInfoItem
                    label="Numéro membre"
                    value={member.member_number}
                />

            </CardContent>

        </Card>

    );

}