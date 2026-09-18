import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { supabase } from "@/shared/lib/supabase";
import { ProfileService } from "../services/profile.service";

export default function AuthCallback() {

    const navigate = useNavigate();

    useEffect(() => {

        handleCallback();

    }, []);

    async function handleCallback() {

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {

            navigate("/");

            return;

        }

        try {

            const profile = await ProfileService.ensureProfileExists(

                user.id,

                user.email ?? "",

                user.user_metadata?.full_name ?? user.user_metadata?.name,

            );

            if (profile.status === "pending") {

                toast.info("Ton compte est en attente de validation par un administrateur.");

                await supabase.auth.signOut();

                navigate("/");

                return;

            }

            navigate("/dashboard");

        } catch {

            toast.error("Une erreur est survenue lors de la connexion.");

            navigate("/");

        }

    }

    return (

        <div className="flex min-h-screen items-center justify-center">

            <p className="text-muted-foreground">Connexion en cours...</p>

        </div>

    );

}