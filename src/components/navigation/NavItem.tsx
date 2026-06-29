import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    url: string;
    icon: LucideIcon;
}

export default function NavItem({
    title,
    url,
    icon: Icon,
}: Props) {
    return (
        <NavLink
            to={url}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all
        ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
            }
        >
            <Icon size={20} />
            <span>{title}</span>
        </NavLink>
    );
}