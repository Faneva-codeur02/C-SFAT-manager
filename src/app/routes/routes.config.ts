import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

import Dashboard from "@/features/dashboard/pages/Dashboard";

import Members from "@/features/members/pages/Members";
import ArchivedMembers from "@/features/members/pages/ArchivedMembers";

import Registrations from "@/features/registrations/pages/Registrations";
import Invitations from "@/features/invitations/pages/Invitations";

import Contributions from "@/features/contributions/pages/Contributions";
import Events from "@/features/events/pages/Events";
import Reports from "@/features/reports/pages/Reports";
import Settings from "@/features/settings/pages/Settings";

import { ROUTE_PERMISSIONS } from "./route-permissions";
import type { ComponentType } from "react";
import type { Permission } from "@/auth/permissions";

export interface AppRoute {

    path: string;

    component: ComponentType;

    permission?: Permission;

    protected?: boolean;

}

export const appRoutes: AppRoute[] = [

    // ==========================
    // Routes publiques
    // ==========================

    {

        path: "/",

        component: Login,

        protected: false,

    },

    {

        path: "/register",

        component: Register,

        protected: false,

    },

    // ==========================
    // Routes protégées
    // ==========================

    {

        path: "/dashboard",

        component: Dashboard,

        protected: true,

        permission: ROUTE_PERMISSIONS.dashboard,

    },

    {

        path: "/members",

        component: Members,

        protected: true,

        permission: ROUTE_PERMISSIONS.members,

    },

    {

        path: "/members/archives",

        component: ArchivedMembers,

        protected: true,

        permission: ROUTE_PERMISSIONS.archivedMembers,

    },

    {

        path: "/members/registrations",

        component: Registrations,

        protected: true,

        permission: ROUTE_PERMISSIONS.registrations,

    },

    {

        path: "/members/invitations",

        component: Invitations,

        protected: true,

        permission: ROUTE_PERMISSIONS.invitations,

    },

    {

        path: "/contributions",

        component: Contributions,

        protected: true,

        permission: ROUTE_PERMISSIONS.contributions,

    },

    {

        path: "/events",

        component: Events,

        protected: true,

        permission: ROUTE_PERMISSIONS.events,

    },

    {

        path: "/reports",

        component: Reports,

        protected: true,

        permission: ROUTE_PERMISSIONS.reports,

    },

    {

        path: "/settings",

        component: Settings,

        protected: true,

        permission: ROUTE_PERMISSIONS.settings,

    },

];