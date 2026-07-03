import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import MemberTable from "@/features/members/components/MemberTable";
import { useMembers } from "@/features/members/hooks/useMember";
import MemberForm from "@/features/members/components/MemberForm";
import { useState } from "react";



export default function Members() {
    const { members, loading } = useMembers();

    const [open, setOpen] = useState(false);

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
                <MemberTable members={members} />
            )}

            <MemberForm
                open={open}
                onOpenChange={setOpen}
            />
        </AppLayout>
    );
}