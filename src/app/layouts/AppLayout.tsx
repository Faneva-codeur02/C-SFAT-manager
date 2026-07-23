import Header from "./Header";

import DesktopSidebar from "@/shared/components/sidebar/DesktopSidebar";
import MobileSidebar from "@/shared/components/sidebar/MobileSidebar";
import { useSidebar } from "@/shared/context/sidebar/useSidebar";
import { cn } from "@/shared/utils/utils";

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({
    children,
}: Props) {

    const {

        isMobile,

        collapsed,

    } = useSidebar();

    return (

        <div className="min-h-screen bg-background">

            {isMobile ? <MobileSidebar /> : <DesktopSidebar />}

            <div

                className={cn(

                    "flex min-h-screen flex-col transition-all duration-300",

                    !isMobile && (

                        collapsed

                            ? "ml-16"

                            : "ml-64"

                    )

                )}

            >

                <Header />

                <main className="flex-1 bg-muted/30 p-6">

                    {children}

                </main>

            </div>

        </div>

    );

}