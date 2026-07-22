import Header from "./Header";

import DesktopSidebar from "@/shared/components/sidebar/DesktopSidebar";
import MobileSidebar from "@/shared/components/sidebar/MobileSidebar";

import { useIsMobile } from "@/shared/hooks/useIsMobile";

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({
    children,
}: Props) {

    const isMobile = useIsMobile();

    return (

        <div className="flex min-h-screen bg-background">

            {

                isMobile

                    ? <MobileSidebar />

                    : <DesktopSidebar />

            }

            <div className="flex min-w-0 flex-1 flex-col">

                <Header />

                <main className="flex-1 bg-muted/30 p-6">

                    {children}

                </main>

            </div>

        </div>

    );

}