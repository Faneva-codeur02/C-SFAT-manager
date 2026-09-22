import { useNavigate } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { PERMISSIONS } from "@/auth/permissions";
import { supabase } from "@/shared/lib/supabase";
import ProfileAvatar from "@/shared/components/ProfileAvatar";

export default function UserMenu() {

    const { user } = useAuth();

    const profile = useProfile(user?.id);

    const navigate = useNavigate();

    const { can } = usePermission();

    const canManageSettings = can(PERMISSIONS.SETTINGS_MANAGE);

    async function logout() {

        await supabase.auth.signOut();

    }

    return (

        <DropdownMenu>

            <DropdownMenuTrigger>

                <ProfileAvatar

                    path={profile?.photo_url ?? null}

                    fallback={`${profile?.prenom?.charAt(0) ?? ""}${profile?.nom?.charAt(0) ?? ""}`}

                    className="cursor-pointer"

                />

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem onClick={() => navigate("/profile")}>

                    Mon profil

                </DropdownMenuItem>

                {canManageSettings && (

                    <DropdownMenuItem onClick={() => navigate("/settings")}>

                        Paramètres

                    </DropdownMenuItem>

                )}

                <DropdownMenuItem
                    onClick={logout}
                    className="text-red-500"
                >

                    Déconnexion

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );

}