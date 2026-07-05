import type { Profile } from "@/types";

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

            <MemberPersonalCard
                member={member}
            />

            <MemberChoirCard
                member={member}
            />

        </div>

    );

}