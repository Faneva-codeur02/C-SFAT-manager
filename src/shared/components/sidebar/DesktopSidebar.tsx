
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";
import SidebarLogo from "./SidebarLogo";
import { useSidebar } from "@/shared/context/sidebar/useSidebar";
import { cn } from "@/shared/utils/utils";

export default function DesktopSidebar() {

    const { collapsed } = useSidebar();

    return (

        <aside
            className={cn(
                "flex h-screen flex-col border-r bg-sidebar transition-all duration-300",

                collapsed
                    ? "w-16"
                    : "w-64"
            )}
        >

            <SidebarHeader>
                <SidebarLogo />
            </SidebarHeader>

            <SidebarNavigation />

            <SidebarFooter />

        </aside>

    );

}