import { cn } from "@/shared/utils/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function SidebarContent({
    children,
    className,
}: Props) {
    return (
        <div
            className={cn(
                "flex-1 overflow-y-auto px-2",
                className
            )}
        >
            {children}
        </div>
    );
}