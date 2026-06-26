import {
    LayoutDashboard,
    Users,
    Wallet,
    Calendar,
    BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { KeyRound } from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        title: "Membres",
        icon: Users,
        path: "/members",
    },
    {
        title: "Cotisations",
        icon: Wallet,
        path: "/cotisations",
    },
    {
        title: "Évènements",
        icon: Calendar,
        path: "/events",
    },
    {
        title: "Rapports",
        icon: BarChart3,
        path: "/reports",
    },
    {
        title: "Invitations",
        icon: KeyRound,
        path: "/invitations",
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 border-r bg-white">
            <div className="border-b p-6">
                <h1 className="font-bold text-xl">
                    C-SFAT
                </h1>

                <p className="text-sm text-muted-foreground">
                    Manager
                </p>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2 transition
              ${isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                            }`
                        }
                    >
                        <item.icon size={18} />

                        {item.title}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}