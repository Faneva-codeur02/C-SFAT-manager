import AppSidebar from "./AppSidebar";

import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({
    children,
}: Props) {

    return (

        <SidebarProvider>

            <AppSidebar />

            <SidebarInset>

                <div className="flex min-h-screen flex-col">

                    <Header />

                    <main className="flex-1 bg-muted/30 p-6">

                        {children}

                    </main>

                </div>
            </SidebarInset>

        </SidebarProvider>

    );

}