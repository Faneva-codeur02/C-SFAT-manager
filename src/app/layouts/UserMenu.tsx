import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { supabase } from "@/shared/lib/supabase";

export default function UserMenu() {

    const { user } = useAuth();

    const profile = useProfile(user?.id);

    async function logout() {

        await supabase.auth.signOut();

    }

    return (

        <DropdownMenu>

            <DropdownMenuTrigger>

                <Avatar className="cursor-pointer">

                    <AvatarImage src={profile?.photo_url ?? ""} />

                    <AvatarFallback>

                        {profile?.prenom?.charAt(0)}
                        {profile?.nom?.charAt(0)}

                    </AvatarFallback>

                </Avatar>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem>

                    Mon profil

                </DropdownMenuItem>

                <DropdownMenuItem>

                    Paramètres

                </DropdownMenuItem>

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