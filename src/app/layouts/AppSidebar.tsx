
import Logo from "@/shared/components/logo/Logo";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
} from "@/shared/components/ui/sidebar";

import { Separator } from "@/shared/components/ui/separator";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useProfile } from "@/features/auth/hooks/useProfile";
import SidebarGroup from "@/shared/components/sidebar/SidebarGroup";
import {
    Users as UsersIcon
} from "lucide-react";
import {
    Users,
    Archive,
    UserPlus,
    Mail,
} from "lucide-react";

export default function AppSidebar() {

    const { user } = useAuth();
    const profile = useProfile(user?.id);

    return (
        <Sidebar>

            <SidebarHeader className="p-4">
                <Logo />
            </SidebarHeader>

            <Separator />

            <SidebarContent className="px-2">

                <SidebarGroup

                    title="Membres"

                    icon={UsersIcon}

                    items={[
                        {
                            title: "Tous les membres",
                            url: "/members",
                            icon: Users,
                        },

                        {
                            title: "Archives",
                            url: "/members/archives",
                            icon: Archive,
                        },

                        {
                            title: "Inscriptions",
                            url: "/members/registrations",
                            icon: UserPlus,
                        },

                        {
                            title: "Invitations",
                            url: "/members/invitations",
                            icon: Mail,
                        },

                    ]}

                />

            </SidebarContent>

            <Separator />

            <SidebarFooter className="p-4">

                <div>

                    <p className="font-semibold">
                        {profile?.prenom}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {profile?.role}
                    </p>

                </div>

            </SidebarFooter>

        </Sidebar>
    );
}