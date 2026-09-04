import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";

import { useSettings } from "@/features/settings/hooks/useSettings";

const settingsSchema = z.object({

    choir_name: z.string().min(1, "Le nom de la chorale est requis"),

    church_name: z.string().min(1, "Le nom de l'église est requis"),

    currency: z.string().min(1, "La devise est requise"),

    registration_open: z.boolean(),

});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function Settings() {

    const { settings, loading, saving, saveSettings } =
        useSettings();

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

            <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

            <form

                onSubmit={handleSubmit(onSubmit)}

                className="max-w-lg space-y-4"

            >

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

        </AppLayout>

    );

}