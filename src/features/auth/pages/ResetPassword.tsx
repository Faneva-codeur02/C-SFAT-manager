import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { supabase } from "@/shared/lib/supabase";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import AuthLayout from "../components/AuthLayout";

export default function ResetPassword() {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        if (password.length < 6) {

            toast.error("Le mot de passe doit contenir au moins 6 caractères.");

            return;

        }

        if (password !== confirmPassword) {

            toast.error("Les mots de passe ne correspondent pas.");

            return;

        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({ password });

        setLoading(false);

        if (error) {

            toast.error("Impossible de mettre à jour le mot de passe. Le lien a peut-être expiré.");

            return;

        }

        toast.success("Mot de passe mis à jour, tu peux te reconnecter.");

        navigate("/");

    }

    return (

        <AuthLayout

            title="Nouveau mot de passe"

            subtitle="Choisis un nouveau mot de passe pour ton compte."

        >

            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-2">

                    <Label htmlFor="password">Nouveau mot de passe</Label>

                    <Input

                        id="password"

                        type="password"

                        placeholder="••••••••"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        required

                    />

                </div>

                <div className="space-y-2">

                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>

                    <Input

                        id="confirmPassword"

                        type="password"

                        placeholder="••••••••"

                        value={confirmPassword}

                        onChange={(e) => setConfirmPassword(e.target.value)}

                        required

                    />

                </div>

                <Button type="submit" className="w-full" disabled={loading}>

                    {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}

                </Button>

            </form>

        </AuthLayout>

    );

}