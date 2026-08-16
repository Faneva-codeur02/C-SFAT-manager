import { useMemo, useState } from "react";
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
import { Textarea } from "@/shared/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import { useAccountCategories } from "../hooks/useAccountCategories";
import { useFinancialAccounts } from "../hooks/useFinancialAccounts";
import { useCreateAccountingEntry } from "../hooks/useCreateAccountingEntry";

const entrySchema = z.object({

    entry_type: z.enum(["income", "expense"]),

    category_id: z.string().min(1, "Sélectionne une catégorie"),

    financial_account_id: z.string().min(1, "Sélectionne un compte"),

    amount: z
        .number({ message: "Montant invalide" })
        .positive("Le montant doit être positif"),

    entry_date: z.string().min(1, "La date est requise"),

    description: z.string().optional(),

});

type EntryFormValues = z.infer<typeof entrySchema>;

type Props = {

    open: boolean;

    onOpenChange(open: boolean): void;

    onCreated(): void;

};

export default function ManualEntryDialog({
    open,
    onOpenChange,
    onCreated,
}: Props) {

    const { categories, loading: loadingCategories } =
        useAccountCategories();

    const { accounts, loading: loadingAccounts } =
        useFinancialAccounts();

    const { submitEntry, submitting, error } =
        useCreateAccountingEntry();

    const [success, setSuccess] =
        useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EntryFormValues>({

        resolver: zodResolver(entrySchema),

        defaultValues: {

            entry_type: "expense",

            category_id: "",

            financial_account_id: "",

            amount: 0,

            entry_date: new Date().toISOString().slice(0, 10),

            description: "",

        },

    });

    const entryType = watch("entry_type");

    const filteredCategories = useMemo(

        () => categories.filter((c) => c.type === entryType),

        [categories, entryType],

    );

    async function onSubmit(values: EntryFormValues) {

        const entry = await submitEntry({

            category_id: values.category_id,

            financial_account_id: values.financial_account_id,

            entry_type: values.entry_type,

            amount: values.amount,

            entry_date: values.entry_date,

            description: values.description || undefined,

        });

        if (entry) {

            setSuccess(true);

            onCreated();

        }

    }

    function handleClose(open: boolean) {

        if (!open) {

            reset();

            setSuccess(false);

        }

        onOpenChange(open);

    }

    return (

        <Dialog open={open} onOpenChange={handleClose}>

            <DialogContent>

                {success ? (

                    <>

                        <DialogHeader>

                            <DialogTitle>
                                Écriture enregistrée ✅
                            </DialogTitle>

                        </DialogHeader>

                        <DialogFooter>

                            <Button onClick={() => handleClose(false)}>

                                Fermer

                            </Button>

                        </DialogFooter>

                    </>

                ) : (

                    <>

                        <DialogHeader>

                            <DialogTitle>
                                Nouvelle écriture
                            </DialogTitle>

                        </DialogHeader>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >

                            <div>

                                <Label>Type</Label>

                                <div className="flex gap-2 mt-1">

                                    <Button

                                        type="button"

                                        variant={entryType === "expense" ? "default" : "outline"}

                                        className="flex-1"

                                        onClick={() => {

                                            setValue("entry_type", "expense");

                                            setValue("category_id", "");

                                        }}

                                    >

                                        Dépense

                                    </Button>

                                    <Button

                                        type="button"

                                        variant={entryType === "income" ? "default" : "outline"}

                                        className="flex-1"

                                        onClick={() => {

                                            setValue("entry_type", "income");

                                            setValue("category_id", "");

                                        }}

                                    >

                                        Recette

                                    </Button>

                                </div>

                            </div>

                            <div>

                                <Label htmlFor="category_id">Catégorie</Label>

                                <Select

                                    value={watch("category_id")}

                                    onValueChange={(value) => {

                                        if (value) {

                                            setValue("category_id", value);

                                        }

                                    }}

                                >

                                    <SelectTrigger id="category_id" className="w-full">

                                        <SelectValue placeholder={loadingCategories ? "Chargement..." : "Sélectionner"} />

                                    </SelectTrigger>

                                    <SelectContent>

                                        {filteredCategories.map((category) => (

                                            <SelectItem key={category.id} value={category.id}>

                                                {category.name}

                                            </SelectItem>

                                        ))}

                                    </SelectContent>

                                </Select>

                                {errors.category_id && (

                                    <p className="text-sm text-destructive mt-1">
                                        {errors.category_id.message}
                                    </p>

                                )}

                            </div>

                            <div>

                                <Label htmlFor="financial_account_id">Compte concerné</Label>

                                <Select

                                    value={watch("financial_account_id")}

                                    onValueChange={(value) => {

                                        if (value) {

                                            setValue("financial_account_id", value);

                                        }

                                    }}

                                >

                                    <SelectTrigger id="financial_account_id" className="w-full">

                                        <SelectValue placeholder={loadingAccounts ? "Chargement..." : "Sélectionner"} />

                                    </SelectTrigger>

                                    <SelectContent>

                                        {accounts.map((account) => (

                                            <SelectItem key={account.id} value={account.id}>

                                                {account.name}

                                            </SelectItem>

                                        ))}

                                    </SelectContent>

                                </Select>

                                {errors.financial_account_id && (

                                    <p className="text-sm text-destructive mt-1">
                                        {errors.financial_account_id.message}
                                    </p>

                                )}

                            </div>

                            <div>

                                <Label htmlFor="amount">Montant</Label>

                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    {...register("amount", { valueAsNumber: true })}
                                />

                                {errors.amount && (

                                    <p className="text-sm text-destructive mt-1">
                                        {errors.amount.message}
                                    </p>

                                )}

                            </div>

                            <div>

                                <Label htmlFor="entry_date">Date</Label>

                                <Input
                                    id="entry_date"
                                    type="date"
                                    {...register("entry_date")}
                                />

                                {errors.entry_date && (

                                    <p className="text-sm text-destructive mt-1">
                                        {errors.entry_date.message}
                                    </p>

                                )}

                            </div>

                            <div>

                                <Label htmlFor="description">Description (optionnel)</Label>

                                <Textarea
                                    id="description"
                                    {...register("description")}
                                />

                            </div>

                            {error && (

                                <p className="text-sm text-destructive">
                                    Une erreur est survenue : {error.message}
                                </p>

                            )}

                            <DialogFooter>

                                <Button
                                    type="submit"
                                    disabled={submitting}
                                >

                                    {submitting ? "Enregistrement..." : "Enregistrer"}

                                </Button>

                            </DialogFooter>

                        </form>

                    </>

                )}

            </DialogContent>

        </Dialog>

    );

}