import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { supabase } from "@/shared/lib/supabase";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {

            redirectTo: `${window.location.origin}/reset-password`,

        });

        setLoading(false);

        if (error) {

            toast.error("Une erreur est survenue.");

            return;

        }

        setSent(true);

    }

    return (

        <AuthLayout

            title="Mot de passe oublié"

            subtitle="Entre ton email, on t'envoie un lien de réinitialisation."

        >

            {sent ? (

                <div className="space-y-4 text-center">

                    <p className="text-sm text-muted-foreground">

                        Si un compte existe pour <strong>{email}</strong>, un email
                        contenant un lien de réinitialisation vient d'être envoyé.

                    </p>

                    <Link

                        to="/"

                        className="inline-block text-sm font-medium text-primary hover:underline"

                    >

                        Retour à la connexion

                    </Link>

                </div>

            ) : (

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="space-y-2">

                        <Label htmlFor="email">Email</Label>

                        <Input

                            id="email"

                            type="email"

                            placeholder="email@example.com"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            required

                        />

                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>

                        {loading ? "Envoi..." : "Envoyer le lien"}

                    </Button>

                    <p className="text-center text-sm text-muted-foreground">

                        <Link to="/" className="font-medium text-primary hover:underline">

                            Retour à la connexion

                        </Link>

                    </p>

                </form>

            )}

        </AuthLayout>

    );

}