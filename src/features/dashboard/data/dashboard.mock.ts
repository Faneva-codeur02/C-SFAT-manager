import {
    UserPlus,
    Users,
    Wallet,
    Calendar,
    CalendarPlus,
    Receipt,
    FileText,
    CalendarDays,
    AlertTriangle,
} from "lucide-react";

import type { DashboardData } from "../types/dashboard.types";

export const dashboardMock: DashboardData = {

    stats: [

        {

            id: "members",

            title: "Membres",

            value: 126,

            description: "+8 ce mois",

            icon: Users,

            color: "blue",

            trend: 8,

        },

        {

            id: "payments",

            title: "Cotisations",

            value: 78,

            description: "Ce mois",

            icon: Wallet,

            color: "green",

            trend: 12,

        },

        {

            id: "events",

            title: "Événements",

            value: 6,

            description: "Programmés",

            icon: CalendarDays,

            color: "orange",

        },

        {

            id: "late",

            title: "Retards",

            value: 9,

            description: "Cotisations en attente",

            icon: AlertTriangle,

            color: "red",

            trend: -2,

        },

    ],

    monthlyContributions: [

        {
            month: "Jan",
            amount: 120000,
        },

        {
            month: "Fév",
            amount: 145000,
        },

        {
            month: "Mar",
            amount: 170000,
        },

        {
            month: "Avr",
            amount: 165000,
        },

        {
            month: "Mai",
            amount: 190000,
        },

        {
            month: "Juin",
            amount: 215000,
        },

        {
            month: "Juil",
            amount: 240000,
        },

    ],

    memberEvolution: [

        {
            month: "Jan",
            members: 85,
        },

        {
            month: "Fév",
            members: 89,
        },

        {
            month: "Mar",
            members: 93,
        },

        {
            month: "Avr",
            members: 97,
        },

        {
            month: "Mai",
            members: 105,
        },

        {
            month: "Juin",
            members: 114,
        },

        {
            month: "Juil",
            members: 126,
        },

    ],

    paymentCategories: [

        {
            name: "Cotisations",
            value: 72,
        },

        {
            name: "Dons",
            value: 18,
        },

        {
            name: "Autres",
            value: 10,
        },

    ],

    recentActivities: [

        {

            id: "1",

            title: "Nouveau membre",

            description: "Jean Rakoto a rejoint la chorale.",

            date: "Il y a 5 min",

            icon: UserPlus,

            color: "blue",

        },

        {

            id: "2",

            title: "Cotisation reçue",

            description: "Paul a payé 20 000 Ar.",

            date: "Il y a 25 min",

            icon: Wallet,

            color: "green",

        },

        {

            id: "3",

            title: "Nouvel événement",

            description: "Répétition générale programmée.",

            date: "Aujourd'hui",

            icon: Calendar,

            color: "orange",

        },

        {

            id: "4",

            title: "Rapport généré",

            description: "Rapport financier mensuel.",

            date: "Hier",

            icon: Receipt,

            color: "purple",

        },

    ],

    quickActions: [

        {

            id: "1",

            title: "Ajouter un membre",

            icon: UserPlus,

            color: "blue",

            href: "/members/new",

        },

        {

            id: "2",

            title: "Nouvelle cotisation",

            icon: Wallet,

            color: "green",

            href: "/payments/new",

        },

        {

            id: "3",

            title: "Créer un événement",

            icon: CalendarPlus,

            color: "orange",

            href: "/events/new",

        },

        {

            id: "4",

            title: "Voir les rapports",

            icon: FileText,

            color: "purple",

            href: "/reports",

        },

    ],

};