
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
import { cn } from "@/shared/utils/utils";
import { useSidebar } from "@/shared/context/sidebar/useSidebar";
import { motion } from "framer-motion";
import SidebarLogo from "@/shared/components/sidebar/SidebarLogo";
import SidebarToggle from "@/shared/components/sidebar/SidebarToggle";


export default function AppSidebar() {

    const { user } = useAuth();
    const profile = useProfile(user?.id);
    const menu =
        useNavigation();
    const { collapsed } = useSidebar();

    return (
        <Sidebar
            className={cn(
                "flex shrink-0 flex-col overflow-hidden border-r transition-all duration-300",
                collapsed
                    ? "w-16"
                    : "w-64"
            )}
        >

            <SidebarHeader className="border-b p-4">

                <div className="group flex items-center justify-between">

                    <SidebarLogo
                        collapsed={collapsed}
                    />
                    <SidebarToggle
                        className="
                                opacity-40
                                group-hover:opacity-100
                            "
                    />

                </div>

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

                                collapsed={collapsed}

                            />

                        );


                    })
                }

            </SidebarContent>

            <Separator />

            <SidebarFooter className="p-4">

                {

                    collapsed

                        ?

                        (

                            <div className="flex justify-center">

                                <div
                                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-primary
                        font-semibold
                        text-primary-foreground
                    "
                                >

                                    {

                                        profile?.prenom?.charAt(0)

                                    }

                                </div>

                            </div>

                        )

                        :

                        (

                            <div>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        opacity: collapsed ? 0 : 1,
                                        width: collapsed ? 0 : "auto",
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="overflow-hidden"
                                >
                                    <p className="font-semibold whitespace-nowrap">
                                        {profile?.prenom}
                                    </p>

                                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                                        {profile?.role}
                                    </p>
                                </motion.div>

                            </div>

                        )

                }

            </SidebarFooter>
        </Sidebar>
    );
}