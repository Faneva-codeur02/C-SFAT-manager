import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import MemberTable from "@/features/members/components/MemberTable";
import { useMembers } from "@/features/members/hooks/useMember";
import MemberForm from "@/features/members/components/MemberForm";
import { useState } from "react";
import { useSearch } from "@/shared/context/SearchContext";
import type { Profile } from "@/types";
import MemberDetailsDialog from "../dialogs/MemberDetailsDialog";
import EditMemberDialog from "@/features/members/dialogs/EditMemberDialog"




export default function Members() {
    const {
        members,
        loading,
        loadMembers,
    } = useMembers();

    const [open, setOpen] = useState(false);

    const { search } = useSearch();

    const filteredMembers = members.filter((member) => {

        const value =
            `${member.nom} ${member.prenom} ${member.voice_part}`
                .toLowerCase();

        return value.includes(search.toLowerCase());

    });

    const [selectedMember, setSelectedMember] =
        useState<Profile | null>(null);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    function handleEdit(member: Profile) {

        setSelectedMember(member);

        setEditOpen(true);

    }

    return (

        <AppLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">
                    Gestion des membres
                </h1>

                <Button
                    onClick={() => setOpen(true)}
                >
                    Ajouter un membre
                </Button>
            </div>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <MemberTable
                    members={filteredMembers}
                    onView={() => { }}
                    onEdit={handleEdit}
                />
            )}

            <MemberForm
                open={open}
                onOpenChange={setOpen}
            />
            <MemberDetailsDialog
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                member={selectedMember}
            />

            <EditMemberDialog

                member={selectedMember}

                open={editOpen}

                onClose={() => setEditOpen(false)}

                onUpdated={loadMembers}

            />
        </AppLayout>
    );
}