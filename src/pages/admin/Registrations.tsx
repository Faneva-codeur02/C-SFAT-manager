import AppLayout from "@/components/layout/AppLayout";

import {
    usePendingMembers,
} from "@/hooks/usePendingMembers";

export default function Registrations() {

    const {

        members,

        loading,

    } = usePendingMembers();

    if (loading)
        return <p>Chargement...</p>;

    return (

        <AppLayout>

            <h1 className="text-3xl font-bold mb-6">

                Inscriptions en attente

            </h1>

            <div className="space-y-4">

                {members.map(member => (

                    <div
                        key={member.id}
                        className="border rounded-lg p-4"
                    >

                        <h2 className="font-semibold">

                            {member.nom} {member.prenom}

                        </h2>

                        <p>

                            {member.email}

                        </p>

                        <p>

                            {member.telephone}

                        </p>

                    </div>

                ))}

            </div>

        </AppLayout>

    );

}