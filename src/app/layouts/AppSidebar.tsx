
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
import NavItem from "@/shared/components/navigation/NavItem";
import {
    useNavigation
} from "@/shared/hooks/useNavigation";

export default function AppSidebar() {

    const { user } = useAuth();
    const profile = useProfile(user?.id);
    const menu =
        useNavigation();
    return (
        <Sidebar>

            <SidebarHeader className="p-4">
                <Logo />
            </SidebarHeader>

            <Separator />

            <SidebarContent className="px-2">

                {
                    menu.map(item => {


                        if (item.children) {


                            return (

                                <SidebarGroup

                                    key={item.title}

                                    title={item.title}

                                    icon={item.icon}

                                    items={item.children}

                                />

                            );

                        }



                        return (

                            <NavItem

                                key={item.url}

                                title={item.title}

                                url={item.url!}

                                icon={item.icon}

                            />

                        );


                    })
                }

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