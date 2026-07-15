import type {
    LucideIcon
} from "lucide-react";


import type {
    Permission
} from "@/auth/permissions";


export interface NavigationItem {

    title: string;

    url?: string;

    icon: LucideIcon;


    permission?: Permission;


    children?: NavigationItem[];

}