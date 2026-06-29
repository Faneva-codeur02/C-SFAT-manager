import { navigation } from "@/config/navigation";
import Logo from "@/components/shared/Logo";
import NavItem from "@/components/navigation/NavItem";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

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