import { useState } from "react";
import { supabase } from "@/shared/lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import AuthLayout from "../components/AuthLayout";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {

        e.preventDefault();

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({

            email,

            password,

        });

        setLoading(false);

        if (error) {

            toast.error("Email ou mot de passe incorrect.");

            return;

        }

        navigate("/dashboard");

    }

    return (

        <AuthLayout

            title="Connexion"

            subtitle="Connecte-toi pour accéder à ton espace."

        >

            <form onSubmit={handleLogin} className="space-y-4">

                <div className="space-y-2">

                    <Label htmlFor="email">Email</Label>

                    <Input

                        id="email"

                        type="email"

                        placeholder="email@example.com"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                    />

                </div>

                <div className="space-y-2">

                    <Label htmlFor="password">Mot de passe</Label>

                    <Input

                        id="password"

                        type="password"

                        placeholder="••••••••"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                    />

                </div>

                <Button

                    type="submit"

                    className="w-full"

                    disabled={loading}

                >

                    {loading ? "Connexion..." : "Se connecter"}

                </Button>

                <div className="space-y-2 text-center text-sm">

                    <p>

                        <Link

                            to="/forgot-password"

                            className="font-medium text-primary hover:underline"

                        >

                            Mot de passe oublié ?

                        </Link>

                    </p>

                    <p className="text-muted-foreground">

                        Pas encore de compte ?

                        <Link

                            to="/register"

                            className="ml-1 font-medium text-primary hover:underline"

                        >

                            S'inscrire

                        </Link>

                    </p>

                </div>

            </form>

        </AuthLayout>

    );

}