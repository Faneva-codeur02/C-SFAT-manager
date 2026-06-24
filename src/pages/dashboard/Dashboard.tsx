import AppLayout from "@/components/layout/AppLayout";

import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export default function Dashboard() {
    const { user } = useAuth();

    const profile = useProfile(user?.id);

    return (
        <AppLayout>
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <p className="mt-2">
                Bienvenue
                {" "}
                {profile?.prenom}
            </p>

            <p>
                Rôle :
                {" "}
                {profile?.role}
            </p>
        </AppLayout>
    );
}