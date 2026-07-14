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
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AppSidebar() {
    const [openMenus, setOpenMenus] = useState<string[]>(() => {

        const saved =
            localStorage.getItem(
                "sidebar-open-menus"
            );

        return saved
            ? JSON.parse(saved)
            : [];

    });

    const { user } = useAuth();
    const profile = useProfile(user?.id);

    const role = profile?.role;

    const menu = navigation.filter((item) =>
        role ? item.roles.includes(role) : false
    );

    function toggleMenu(title: string) {

        setOpenMenus(current => {

            const updated =

                current.includes(title)

                    ?

                    current.filter(
                        item => item !== title
                    )

                    :

                    [
                        ...current,
                        title
                    ];


            localStorage.setItem(
                "sidebar-open-menus",
                JSON.stringify(updated)
            );


            return updated;

        });

    }

    return (
        <Sidebar>

            <SidebarHeader className="p-4">
                <Logo />
            </SidebarHeader>

            <Separator />

            <SidebarContent className="px-2">

                <div className="space-y-1">

                    {
                        navigation.map(item => (

                            <div key={item.title}>


                                {
                                    item.children ? (

                                        <>

                                            <button

                                                onClick={() =>
                                                    toggleMenu(
                                                        item.title
                                                    )
                                                }

                                                className="
                                                        flex
                                                        w-full
                                                        items-center
                                                        gap-3
                                                        rounded-md
                                                        px-3
                                                        py-2
                                                        text-md
                                                        font-medium
                                                        hover:bg-muted
                                                    "

                                            >

                                                <item.icon
                                                    size={20}
                                                />


                                                <span className="flex-1 text-left">

                                                    {item.title}

                                                </span>


                                                <ChevronDown

                                                    size={18}

                                                    className={`
                                                        transition-transform
                                                        ${openMenus.includes(
                                                        item.title
                                                    )
                                                            ?
                                                            "rotate-180"
                                                            :
                                                            ""
                                                        }
                        `}

                                                />

                                            </button>



                                            {
                                                openMenus.includes(
                                                    item.title
                                                ) && (

                                                    <div
                                                        className="
                                                        ml-8
                                                        mt-1
                                                        space-y-1
                                                    "
                                                    >

                                                        {
                                                            item.children.map(child => (

                                                                <NavItem

                                                                    key={child.title}

                                                                    title={
                                                                        child.title
                                                                    }

                                                                    url={
                                                                        child.url
                                                                    }

                                                                    icon={
                                                                        child.icon
                                                                    }

                                                                />

                                                            ))
                                                        }


                                                    </div>

                                                )
                                            }


                                        </>


                                    ) : (


                                        <NavItem

                                            title={item.title}

                                            url={item.url}

                                            icon={item.icon}

                                        />


                                    )

                                }


                            </div>


                        ))
                    }

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