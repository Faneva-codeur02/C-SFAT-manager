import { usePendingMembers } from "../hooks/usePendingMembers";
import type { Profile } from "@/types";
import PendingMembersTable from "../components/PendingMembersTable";
import ApproveRegistrationDialog from "../components/ApproveRegistrationDialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import {
    Search,
    RefreshCw,
} from "lucide-react";

import { useMemo, useState } from "react";
import AppLayout from "@/app/layouts/AppLayout";


export default function Registrations() {
    const [selectedMember, setSelectedMember] =
        useState<Profile | null>(null);

    const [search, setSearch] =
        useState("");

    const {
        members,
        loading,
        reload,
    } = usePendingMembers();

    const filteredMembers = useMemo(() => {

        if (!search.trim()) {
            return members;
        }

        const value =
            search.toLowerCase();

        return members.filter((member) =>

            member.nom
                .toLowerCase()
                .includes(value)

            ||

            member.prenom
                .toLowerCase()
                .includes(value)

            ||

            member.email
                .toLowerCase()
                .includes(value)

        );

    }, [members, search]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (

        <AppLayout>

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Inscriptions en attente

                    </h1>

                    <p className="text-muted-foreground">

                        {filteredMembers.length}
                        {" "}
                        inscription(s)

                    </p>

                </div>

                <Button
                    variant="outline"
                    onClick={reload}
                >

                    <RefreshCw className="mr-2 h-4 w-4" />

                    Actualiser

                </Button>

            </div>

            <div className="relative max-w-md py-4">

                <Search
                    className="absolute left-3 top-6 h-4 w-4 text-muted-foreground"
                />

                <Input
                    className="pl-10"
                    placeholder="Rechercher un membre..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <PendingMembersTable
                members={filteredMembers}
                onView={setSelectedMember}
            />

            <ApproveRegistrationDialog
                member={selectedMember}
                open={selectedMember !== null}
                onClose={() =>
                    setSelectedMember(null)
                }
                onApproved={reload}
            />
        </AppLayout>

    );
}