import {
    LayoutDashboard,
    Users,
    UserPlus,
    Mail,
    Archive,
    Wallet,
    ReceiptText,
    CalendarDays,
    BarChart3,
    Settings,
} from "lucide-react";


import {
    PERMISSIONS,
} from "@/auth/permissions";


export const navigation = [

    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,

        // Accessible à tout utilisateur connecté
    },


    {
        title: "Membres",

        icon: Users,

        children: [

            {
                title: "Tous les membres",

                url: "/members",

                icon: Users,

                permission:
                    PERMISSIONS.MEMBERS_VIEW,
            },


            {
                title: "Archives",

                url: "/members/archives",

                icon: Archive,

                permission:
                    PERMISSIONS.MEMBERS_VIEW,
            },


            {
                title: "Inscriptions",

                url: "/members/registrations",

                icon: UserPlus,

                permission:
                    PERMISSIONS.MEMBERS_CREATE,
            },


            {
                title: "Invitations",

                url: "/members/invitations",

                icon: Mail,

                permission:
                    PERMISSIONS.INVITATIONS_CREATE,
            },

        ],

    },


    {
        title: "Cotisations",

        url: "/contributions",

        icon: Wallet,

        permission:
            PERMISSIONS.CONTRIBUTIONS_VIEW,
    },


    {
        title: "Comptabilité",

        url: "/accounting",

        icon: ReceiptText,

        permission:
            PERMISSIONS.ACCOUNTING_VIEW,
    },


    {
        title: "Évènements",

        url: "/events",

        icon: CalendarDays,

        permission:
            PERMISSIONS.EVENTS_VIEW,
    },


    {
        title: "Rapports",

        url: "/reports",

        icon: BarChart3,

        permission:
            PERMISSIONS.ACCOUNTING_VIEW,
    },


    {
        title: "Paramètres",

        url: "/settings",

        icon: Settings,

        permission:
            PERMISSIONS.SETTINGS_MANAGE,
    },

];