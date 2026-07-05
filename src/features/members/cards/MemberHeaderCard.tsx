import type { Profile } from "@/types";

import {
    Avatar,
    AvatarFallback,
} from "@/shared/components/ui/avatar";

import { Badge } from "@/shared/components/ui/badge";

interface Props {
    member: Profile;
}

export default function MemberHeaderCard({
    member,
}: Props) {

    return (

        <div className="flex flex-col items-center gap-4">

            <Avatar className="h-24 w-24">

                <AvatarFallback className="text-2xl">

                    {member.prenom[0]}
                    {member.nom[0]}

                </AvatarFallback>

            </Avatar>

            <div className="text-center">

                <h2 className="text-2xl font-bold">

                    {member.prenom} {member.nom}

                </h2>

                <p className="text-muted-foreground">

                    {member.member_number}

                </p>

            </div>

            <div className="flex gap-2">

                <Badge>

                    {member.status}

                </Badge>

                <Badge variant="outline">

                    {member.voice_part}

                </Badge>

                <Badge variant="secondary">

                    {member.role}

                </Badge>

            </div>

        </div>

    );

}