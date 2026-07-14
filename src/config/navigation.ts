import {
    LayoutDashboard,
    Users,
    UserPlus,
    KeyRound,
    Wallet,
    BookOpen,
    CalendarDays,
    BarChart3,
    Settings,
    Archive,
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
        icon: Users,

        roles: [
            "admin",
            "treasurer"
        ],

        children: [

            {
                title: "Tous les membres",
                url: "/members",
                icon: Users,
            },

            {
                title: "Archives",
                url: "/members/archives",
                icon: Archive,
            },

            {
                title: "Inscriptions",
                url: "/members/registrations",
                icon: UserPlus,
            },

            {
                title: "Invitations",
                url: "/members/invitations",
                icon: KeyRound,
            }

        ]

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