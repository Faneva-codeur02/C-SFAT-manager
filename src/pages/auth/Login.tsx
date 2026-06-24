import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const { error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (error) {
            alert(error.message);
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        C-SFAT Manager
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleLogin}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label>Email</Label>

                            <Input
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Mot de passe</Label>

                            <Input
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Se connecter
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}