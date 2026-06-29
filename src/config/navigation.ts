import {
    LayoutDashboard,
    Users,
    KeyRound,
    Wallet,
    BookOpen,
    CalendarDays,
    BarChart3,
    Settings,
} from "lucide-react";

export const navigation = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "treasurer", "member"],
    },
    {
        title: "Membres",
        url: "/members",
        icon: Users,
        roles: ["admin"],
    },
    {
        title: "Invitations",
        url: "/invitations",
        icon: KeyRound,
        roles: ["admin"],
    },
    {
        title: "Cotisations",
        url: "/contributions",
        icon: Wallet,
        roles: ["admin", "treasurer", "member"],
    },
    {
        title: "Comptabilité",
        url: "/accounting",
        icon: BookOpen,
        roles: ["admin", "treasurer"],
    },
    {
        title: "Évènements",
        url: "/events",
        icon: CalendarDays,
        roles: ["admin", "member", "treasurer"],
    },
    {
        title: "Rapports",
        url: "/reports",
        icon: BarChart3,
        roles: ["admin", "treasurer"],
    },
    {
        title: "Paramètres",
        url: "/settings",
        icon: Settings,
        roles: ["admin"],
    },
];