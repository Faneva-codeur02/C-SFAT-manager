import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { supabase } from "@/shared/lib/supabase";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import AuthLayout from "../components/AuthLayout";
import { isRegistrationOpen } from "@/features/settings/services/settings.service";
import GoogleSignInButton from "../components/GoogleSignInButton";

export default function Register() {

    const navigate = useNavigate();

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [registrationOpen, setRegistrationOpen] = useState<boolean | null>(null);

    useEffect(() => {

        isRegistrationOpen().then(setRegistrationOpen);

    }, []);

    async function handleRegister(e: React.FormEvent) {

        e.preventDefault();

        const stillOpen = await isRegistrationOpen();

        if (!stillOpen) {

            toast.error("Les inscriptions sont actuellement fermées.");

            return;

        }

        setLoading(true);

        try {

            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {

                toast.error(error.message);

                return;

            }

            const userId = data.user?.id;

            if (!userId) {

                toast.error("Erreur utilisateur");

                return;

            }

            const { error: profileError } = await supabase

                .from("profiles")

                .insert({

                    id: userId,

                    email,

                    nom,

                    prenom,

                    telephone,

                    role: "member",

                    status: "pending",

                });

            if (profileError) {

                console.error(profileError);

                toast.error(profileError.message);

                return;

            }

            toast.success("Inscription envoyée. En attente de validation.");

            navigate("/");

        } catch (err) {

            toast.error(

                err instanceof Error ? err.message : "Une erreur est survenue.",

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <AuthLayout

            title="Inscription"

            subtitle="Crée ton compte, un admin validera ton accès."

        >

            {registrationOpen === false && (

                <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">

                    Les inscriptions sont actuellement fermées. Contacte un administrateur.

                </p>

            )}

            <form onSubmit={handleRegister} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-2">

                        <Label htmlFor="nom">Nom</Label>

                        <Input

                            id="nom"

                            value={nom}

                            onChange={(e) => setNom(e.target.value)}

                            required

                        />

                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="prenom">Prénom</Label>

                        <Input

                            id="prenom"

                            value={prenom}

                            onChange={(e) => setPrenom(e.target.value)}

                            required

                        />

                    </div>

                </div>

                <div className="space-y-2">

                    <Label htmlFor="telephone">Téléphone</Label>

                    <Input

                        id="telephone"

                        value={telephone}

                        onChange={(e) => setTelephone(e.target.value)}

                    />

                </div>

                <div className="space-y-2">

                    <Label htmlFor="email">Email</Label>

                    <Input

                        id="email"

                        type="email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required

                    />

                </div>

                <div className="space-y-2">

                    <Label htmlFor="password">Mot de passe</Label>

                    <Input

                        id="password"

                        type="password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        required

                    />

                </div>

                <Button type="submit" className="w-full" disabled={loading}>

                    {loading ? "Inscription..." : "S'inscrire"}

                </Button>

                <p className="text-center text-sm text-muted-foreground">

                    Déjà un compte ?

                    <Link to="/" className="ml-1 font-medium text-primary hover:underline">

                        Se connecter

                    </Link>

                </p>

                <div className="relative my-2">

                    <div className="absolute inset-0 flex items-center">

                        <span className="w-full border-t" />

                    </div>

                    <div className="relative flex justify-center text-xs uppercase">

                        <span className="bg-background px-2 text-muted-foreground">ou</span>

                    </div>

                </div>

                <GoogleSignInButton />

            </form>

        </AuthLayout>

    );

}