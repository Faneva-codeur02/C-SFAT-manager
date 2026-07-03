import { usePendingMembers } from "../hooks/usePendingMembers";
import { useState } from "react";
import type { Profile } from "@/types";
import PendingMembersTable from "../components/PendingMembersTable";
import ApproveRegistrationDialog from "../components/ApproveRegistrationDialog";


export default function Registrations() {
    const [selectedMember, setSelectedMember] =
        useState<Profile | null>(null);
    const {
        members,
        loading,
        reload,
    } = usePendingMembers();

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">
                Inscriptions en attente
            </h1>

            <PendingMembersTable
                members={members}
                onView={setSelectedMember}
            />

            <ApproveRegistrationDialog
                member={selectedMember}
                open={selectedMember !== null}
                onClose={() => setSelectedMember(null)}
                onApproved={reload}
            />
        </div>


    );
}