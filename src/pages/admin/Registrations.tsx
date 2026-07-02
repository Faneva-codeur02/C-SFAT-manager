import { usePendingMembers } from "@/features/registrations/hooks/usePendingMembers";

export default function Registrations() {

    const {
        members,
        loading,
    } = usePendingMembers();

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="space-y-6 p-6">

            <h1 className="text-3xl font-bold">
                Inscriptions en attente
            </h1>

            <p>
                {members.length} inscription(s)
            </p>

            <div className="space-y-4">

                {members.map(member => (

                    <div
                        key={member.id}
                        className="rounded-lg border p-4 shadow-sm"
                    >

                        <h2 className="font-semibold text-lg">
                            {member.nom} {member.prenom}
                        </h2>

                        <p>{member.email}</p>

                        <p>{member.telephone}</p>

                        <p>
                            Statut :
                            {" "}
                            {member.status}
                        </p>

                        <button
                            className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
                        >
                            Examiner
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );