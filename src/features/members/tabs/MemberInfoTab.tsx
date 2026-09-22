import type { Profile } from "@/types";

import ProfileAvatar from "@/shared/components/ProfileAvatar";

import MemberPersonalCard
    from "../cards/MemberPersonalCard";

import MemberChoirCard
    from "../cards/MemberChoirCard";

interface Props {

    member: Profile;

}

export default function MemberInfoTab({

    member,

}: Props) {

    return (

        <div className="space-y-6">

            <div className="flex items-center gap-4">

                <ProfileAvatar

                    path={member.photo_url}

                    fallback={`${member.prenom?.charAt(0) ?? ""}${member.nom?.charAt(0) ?? ""}`}

                    className="h-20 w-20"

                    clickable

                />

                <div>

                    <p className="text-lg font-semibold">

                        {member.prenom} {member.nom}

                    </p>

                    <p className="text-sm text-muted-foreground">

                        {member.email}

                    </p>

                </div>

            </div>

            <MemberPersonalCard
                member={member}
            />

            <MemberChoirCard
                member={member}
            />

        </div>

    );

}