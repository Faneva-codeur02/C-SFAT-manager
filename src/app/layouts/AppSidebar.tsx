import { navigation } from "@/config/navigation";
import Logo from "@/shared/components/logo/Logo";
import NavItem from "@/shared/components/navigation/NavItem";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
} from "@/shared/components/ui/sidebar";

import { Separator } from "@/shared/components/ui/separator";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useProfile } from "@/features/auth/hooks/useProfile";

export default function AppSidebar() {
    const { user } = useAuth();
    const profile = useProfile(user?.id);

    const role = profile?.role;

    const menu = navigation.filter((item) =>
        role ? item.roles.includes(role) : false
    );

    return (
        <Sidebar>

            <SidebarHeader className="p-4">
                <Logo />
            </SidebarHeader>

            <Separator />

            <SidebarContent className="px-2">

                <div className="space-y-1">

                    {menu.map((item) => (

                        <NavItem
                            key={item.url}
                            title={item.title}
                            url={item.url}
                            icon={item.icon}
                        />

                    ))}

                </div>

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