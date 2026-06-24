import { LogOut } from "lucide-react";

import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    async function logout() {
        await supabase.auth.signOut();

        navigate("/");
    }

    return (
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
            <h2 className="text-xl font-semibold">
                C-SFAT Manager
            </h2>

            <Button
                variant="outline"
                onClick={logout}
            >
                <LogOut className="mr-2 h-4 w-4" />

                Déconnexion
            </Button>
        </header>
    );
}