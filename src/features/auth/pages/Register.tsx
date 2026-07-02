import { useState } from "react";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { markInvitationAsUsed, validateInvitationCode } from "@/services/register/register.service";

export default function Register() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invitationCode, setInvitationCode] = useState("");

    async function handleRegister(
        e: React.FormEvent
    ) {
        e.preventDefault();

        const invitation = await validateInvitationCode(invitationCode);

        const { data, error } =
            await supabase.auth.signUp({
                email,
                password,
            });

        if (error) {
            alert(error.message);
            return;
        }

        const userId = data.user?.id;

        if (!userId) {
            alert("Erreur utilisateur");
            return;
        }

        const { error: profileError } =
            await supabase
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

            alert(profileError.message);

            return;
        }

        await markInvitationAsUsed(
            invitation.id,
            userId
        );

        alert(
            "Inscription envoyée. En attente de validation."
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>
                        Inscription C-SFAT
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleRegister}
                        className="space-y-4"
                    >
                        <div>
                            <Label>Nom</Label>

                            <Input
                                value={nom}
                                onChange={(e) =>
                                    setNom(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Prénom</Label>

                            <Input
                                value={prenom}
                                onChange={(e) =>
                                    setPrenom(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Téléphone</Label>

                            <Input
                                value={telephone}
                                onChange={(e) =>
                                    setTelephone(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Email</Label>

                            <Input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Mot de passe</Label>

                            <Input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Code d'invitation</Label>

                            <Input
                                placeholder="CSFAT-XXXXXX"
                                value={invitationCode}
                                onChange={(e) => setInvitationCode(e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            S'inscrire
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}