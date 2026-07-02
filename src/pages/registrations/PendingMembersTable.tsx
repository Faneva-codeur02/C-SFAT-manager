import type { Profile } from "@/types";

interface Props {
    members: Profile[];
    onView(member: Profile): void;
}

export default function PendingMembersTable({
    members,
    onView,
}: Props) {
    return (
        <div className="overflow-hidden rounded-lg border">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-4 py-3 text-left">
                            Nom
                        </th>

                        <th className="px-4 py-3 text-left">
                            Téléphone
                        </th>

                        <th className="px-4 py-3 text-left">
                            Date
                        </th>

                        <th className="px-4 py-3 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {members.map((member) => (

                        <tr
                            key={member.id}
                            className="border-t"
                        >

                            <td className="px-4 py-3">

                                {member.nom} {member.prenom}

                            </td>

                            <td className="px-4 py-3">

                                {member.telephone ?? "-"}

                            </td>

                            <td className="px-4 py-3">

                                {new Date(
                                    member.created_at
                                ).toLocaleDateString()}

                            </td>

                            <td className="px-4 py-3 text-center">

                                <button
                                    onClick={() =>
                                        onView(member)
                                    }
                                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                                >
                                    Voir
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}