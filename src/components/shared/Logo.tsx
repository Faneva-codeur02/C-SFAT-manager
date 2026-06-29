interface LogoProps {
    collapsed?: boolean;
}

export default function Logo({
    collapsed = false,
}: LogoProps) {
    return (
        <div className="flex items-center gap-3">
            <img
                src="/logo_csfat.png"
                alt="C-SFAT"
                className="h-11 w-11 rounded-full object-cover"
            />

            {!collapsed && (
                <div className="leading-tight">
                    <h1 className="text-base font-bold tracking-tight">
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