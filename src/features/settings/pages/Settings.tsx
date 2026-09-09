import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";

import { useSettings } from "@/features/settings/hooks/useSettings";
import FinancialAccountsManager from "@/features/settings/components/FinancialAccountsManager";
import AccountCategoriesManager from "@/features/settings/components/AccountCategoriesManager";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

const settingsSchema = z.object({

    choir_name: z.string().min(1, "Le nom de la chorale est requis"),

    church_name: z.string().min(1, "Le nom de l'église est requis"),

    currency: z.string().min(1, "La devise est requise"),

    registration_open: z.boolean(),

    monthly_contribution_amount: z.number().positive("Le montant doit être positif"),

});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function Settings() {

    const { settings, loading, saving, saveSettings } =
        useSettings();

    const [activeTab, setActiveTab] = useState<"general" | "accounting">("general");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SettingsFormValues>({

        resolver: zodResolver(settingsSchema),

        defaultValues: settings,

    });

    useEffect(() => {

        if (!loading) {

            reset(settings);

        }

    }, [loading, settings]);

    async function onSubmit(values: SettingsFormValues) {

        await saveSettings(values);

    }

    if (loading) {

        return (

            <AppLayout>

                <p className="text-muted-foreground">Chargement...</p>

            </AppLayout>

        );

    }

    return (

        <AppLayout>

            <h1 className="text-3xl font-bold mb-4">Paramètres</h1>

            <div className="flex gap-2 mb-6">

                <Button

                    variant={activeTab === "general" ? "default" : "outline"}

                    size="sm"

                    onClick={() => setActiveTab("general")}

                >

                    Général

                </Button>

                <Button

                    variant={activeTab === "accounting" ? "default" : "outline"}

                    size="sm"

                    onClick={() => setActiveTab("accounting")}

                >

                    Comptabilité

                </Button>

            </div>

            {activeTab === "general" ? (

                <div className="flex gap-8">

                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg flex-1 space-y-4">

                        <div>

                            <Label htmlFor="choir_name">Nom de la chorale</Label>

                            <Input id="choir_name" {...register("choir_name")} />

                            {errors.choir_name && (

                                <p className="text-sm text-destructive mt-1">
                                    {errors.choir_name.message}
                                </p>

                            )}

                        </div>

                        <div>

                            <Label htmlFor="church_name">Nom de l'église</Label>

                            <Input id="church_name" {...register("church_name")} />

                            {errors.church_name && (

                                <p className="text-sm text-destructive mt-1">
                                    {errors.church_name.message}
                                </p>

                            )}

                        </div>

                        <div>

                            <Label htmlFor="currency">Devise</Label>

                            <Input id="currency" {...register("currency")} />

                            {errors.currency && (

                                <p className="text-sm text-destructive mt-1">
                                    {errors.currency.message}
                                </p>

                            )}

                        </div>

                        <div>

                            <Label htmlFor="monthly_contribution_amount">Cotisation mensuelle (Ar)</Label>

                            <Input

                                id="monthly_contribution_amount"

                                type="number"

                                step="1"

                                {...register("monthly_contribution_amount", { valueAsNumber: true })}

                            />

                            {errors.monthly_contribution_amount && (

                                <p className="text-sm text-destructive mt-1">
                                    {errors.monthly_contribution_amount.message}
                                </p>

                            )}

                            <p className="text-xs text-muted-foreground mt-1">

                                Montant utilisé automatiquement quand une nouvelle saison est créée
                                (ex: paiement d'avance d'un membre).

                            </p>

                        </div>

                        <div className="flex items-center gap-2">

                            <Checkbox

                                id="registration_open"

                                checked={watch("registration_open")}

                                onCheckedChange={(checked) =>

                                    setValue("registration_open", checked === true)

                                }

                            />

                            <Label htmlFor="registration_open" className="cursor-pointer">

                                Autoriser les nouvelles inscriptions

                            </Label>

                        </div>

                        <Button type="submit" disabled={saving}>

                            {saving ? "Enregistrement..." : "Enregistrer"}

                        </Button>

                    </form>

                    <div className="w-72">

                        <Card>

                            <CardHeader>

                                <CardTitle className="text-sm">

                                    Aperçu de l'en-tête des documents

                                </CardTitle>

                            </CardHeader>

                            <CardContent>

                                <div className="rounded-md border bg-white p-4 text-center text-black">

                                    <img

                                        src="/logo_csfat.png"

                                        alt="Logo"

                                        className="mx-auto mb-2 h-10 w-10"

                                    />

                                    <p className="text-xs font-bold">

                                        {watch("choir_name")} — Chorale {watch("church_name")}

                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">

                                        Titre du document...

                                    </p>

                                </div>

                                <p className="mt-3 text-xs text-muted-foreground">

                                    Aperçu en direct — reflète tes modifications avant même
                                    l'enregistrement.

                                </p>

                            </CardContent>

                        </Card>

                    </div>

                </div>

            ) : (

                <div className="max-w-2xl">

                    <FinancialAccountsManager />

                    <AccountCategoriesManager />

                </div>

            )}

        </AppLayout>

    );

}