import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import { useFinancialAccountForm } from "../hooks/useFinancialAccountForm";
import type { FinancialAccount } from "@/features/accounting/types/accounting.types";

const accountSchema = z.object({

    name: z.string().min(1, "Le nom est requis"),

    account_type: z.enum(["cash", "bank", "mobile_money"]),

    opening_balance: z.number({ message: "Montant invalide" }).min(0),

    description: z.string().optional(),

    is_active: z.boolean().optional(),

});

type AccountFormValues = z.infer<typeof accountSchema>;

const typeItems = [

    { value: "cash", label: "Espèces" },

    { value: "bank", label: "Banque" },

    { value: "mobile_money", label: "Mobile Money" },

];

type Props = {

    account: FinancialAccount | null;

    open: boolean;

    onOpenChange(open: boolean): void;

    onSaved(): void;

};

export default function FinancialAccountFormDialog({
    account,
    open,
    onOpenChange,
    onSaved,
}: Props) {

    const isEditing = account !== null;

    const { create, update, submitting, error } =
        useFinancialAccountForm();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AccountFormValues>({

        resolver: zodResolver(accountSchema),

        defaultValues: {

            name: "",

            account_type: "cash",

            opening_balance: 0,

            description: "",

            is_active: true,

        },

    });

    useEffect(() => {

        if (open) {

            reset({

                name: account?.name ?? "",

                account_type: account?.account_type ?? "cash",

                opening_balance: account?.opening_balance ?? 0,

                description: account?.description ?? "",

                is_active: account?.is_active ?? true,

            });

        }

    }, [open, account]);

    async function onSubmit(values: AccountFormValues) {

        const result =

            isEditing

                ? await update(account!.id, {

                    name: values.name,

                    description: values.description || undefined,

                    is_active: values.is_active,

                })

                : await create({

                    name: values.name,

                    account_type: values.account_type,

                    opening_balance: values.opening_balance,

                    description: values.description || undefined,

                });

        if (result) {

            onOpenChange(false);

            onSaved();

        }

    }

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        {isEditing ? "Modifier le compte" : "Nouveau compte financier"}

                    </DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>

                        <Label htmlFor="name">Nom</Label>

                        <Input id="name" {...register("name")} />

                        {errors.name && (

                            <p className="text-sm text-destructive mt-1">
                                {errors.name.message}
                            </p>

                        )}

                    </div>

                    <div>

                        <Label htmlFor="account_type">Type</Label>

                        <Select

                            items={typeItems}

                            value={watch("account_type")}

                            onValueChange={(value) => {

                                if (value && !isEditing) {

                                    setValue(
                                        "account_type",
                                        value as AccountFormValues["account_type"],
                                    );

                                }

                            }}

                        >

                            <SelectTrigger id="account_type" className="w-full" disabled={isEditing}>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {typeItems.map((item) => (

                                    <SelectItem key={item.value} value={item.value}>

                                        {item.label}

                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                        {isEditing && (

                            <p className="text-xs text-muted-foreground mt-1">

                                Le type ne peut pas être modifié après création.

                            </p>

                        )}

                    </div>

                    {!isEditing && (

                        <div>

                            <Label htmlFor="opening_balance">Solde d'ouverture</Label>

                            <Input
                                id="opening_balance"
                                type="number"
                                step="0.01"
                                {...register("opening_balance", { valueAsNumber: true })}
                            />

                            {errors.opening_balance && (

                                <p className="text-sm text-destructive mt-1">
                                    {errors.opening_balance.message}
                                </p>

                            )}

                        </div>

                    )}

                    <div>

                        <Label htmlFor="description">Description (optionnel)</Label>

                        <Input id="description" {...register("description")} />

                    </div>

                    {isEditing && (

                        <div className="flex items-center gap-2">

                            <Checkbox

                                id="is_active"

                                checked={watch("is_active")}

                                onCheckedChange={(checked) =>

                                    setValue("is_active", checked === true)

                                }

                            />

                            <Label htmlFor="is_active" className="cursor-pointer">

                                Compte actif

                            </Label>

                        </div>

                    )}

                    {error && (

                        <p className="text-sm text-destructive">
                            Une erreur est survenue : {error.message}
                        </p>

                    )}

                    <DialogFooter>

                        <Button type="submit" disabled={submitting}>

                            {submitting ? "Enregistrement..." : isEditing ? "Enregistrer" : "Créer"}

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>

    );

}