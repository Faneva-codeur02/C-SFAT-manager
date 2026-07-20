interface SidebarLogoProps {
    collapsed: boolean;
}

export default function SidebarLogo({
    collapsed,
}: SidebarLogoProps) {


    return (
        <div className="flex items-center gap-3">

            <img
                src="/logo_csfat.png"
                className="h-10 w-10 rounded-full"
            />

            {!collapsed && (

                <div>

                    <h1 className="font-bold">
                        C-SFAT
                    </h1>

                    <p className="text-xs text-muted-foreground">
                        Manager
                    </p>

                </div>

            )}

        </div>
    );

}