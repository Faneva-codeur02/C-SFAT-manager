import AppLayout from "@/app/layouts/AppLayout";
import MemberTable from "../components/MemberTable";
import { useArchivedMembers } from "@/features/members/hooks/useArchivedMembers";

export default function ArchivedMembers() {

    const {
        members,
        loading,
        loadMembers,
    } = useArchivedMembers();

    return (

        <AppLayout>

            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    Membres archivés

                </h1>

                <p className="text-muted-foreground">

                    Les membres archivés peuvent être restaurés.

                </p>

            </div>

            {

                loading

                    ? <p>Chargement...</p>

                    : (

                        <MemberTable

                            members={members}

                            archiveMode

                        />

                    )

            }

        </AppLayout>

    );

}