import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/features/auth/context/AuthContext";
import { usePermission } from "@/features/auth/hooks/usePermission";

import type {
    Permission
} from "@/auth/permissions";

import Unauthorized from "@/pages/Unauthorized";


interface Props {

    children: ReactNode;

    permission?: Permission;

}


export default function ProtectedRoute({

    children,

    permission,

}: Props) {


    const {
        user,
        loading
    } = useAuth();


    const {
        can
    } = usePermission();



    if (loading) {

        return (

            <div className="
                flex
                min-h-screen
                items-center
                justify-center
            ">

                Chargement...

            </div>

        );

    }



    if (!user) {

        return (

            <Navigate
                to="/"
                replace
            />

        );

    }



    if (
        permission &&
        !can(permission)
    ) {

        return (

            <Unauthorized />

        );

    }



    return children;

}