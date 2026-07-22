import { cn } from "@/shared/utils/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function SidebarHeader({
    children,
    className,
}: Props) {
    return (
        <div
            className={cn(
                "border-b p-3",
                className
            )}
        >
            {children}
        </div>
    );
}