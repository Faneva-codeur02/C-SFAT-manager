import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";

import type { Profile } from "@/types";

import MemberInfoItem
    from "../components/MemberInfoItem";

interface Props {
    member: Profile;
}

export default function MemberPersonalCard({
    member,
}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Informations personnelles

                </CardTitle>

            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-5">

                <MemberInfoItem
                    label="Email"
                    value={member.email}
                />

                <MemberInfoItem
                    label="Téléphone"
                    value={member.telephone}
                />

                <MemberInfoItem
                    label="Profession"
                    value={member.profession}
                />

                <MemberInfoItem
                    label="Adresse"
                    value={member.adresse}
                />

                <MemberInfoItem
                    label="Date de naissance"
                    value={member.date_naissance}
                />

            </CardContent>

        </Card>

    );

}