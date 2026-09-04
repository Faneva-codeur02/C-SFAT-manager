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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import { useAccountCategoryForm } from "../hooks/useAccountCategoryForm";
import type { AccountCategory } from "@/features/accounting/types/accounting.types";

const categorySchema = z.object({

    name: z.string().min(1, "Le nom est requis"),

    type: z.enum(["income", "expense"]),

    description: z.string().optional(),

});

type CategoryFormValues = z.infer<typeof categorySchema>;

const typeItems = [

    { value: "income", label: "Recette" },

    { value: "expense", label: "Dépense" },

];

type Props = {

    category: AccountCategory | null;

    open: boolean;

    onOpenChange(open: boolean): void;

    onSaved(): void;

};

export default function AccountCategoryFormDialog({
    category,
    open,
    onOpenChange,
    onSaved,
}: Props) {

    const isEditing = category !== null;

    const { create, update, submitting, error } =
        useAccountCategoryForm();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CategoryFormValues>({

        resolver: zodResolver(categorySchema),

        defaultValues: {

            name: "",

            type: "expense",

            description: "",

        },

    });

    useEffect(() => {

        if (open) {

            reset({

                name: category?.name ?? "",

                type: (category?.type as "income" | "expense") ?? "expense",

                description: category?.description ?? "",

            });

        }

    }, [open, category]);

    async function onSubmit(values: CategoryFormValues) {

        const result =

            isEditing

                ? await update(category!.id, {

                    name: values.name,

                    description: values.description || undefined,

                })

                : await create({

                    name: values.name,

                    type: values.type,

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

                        {isEditing ? "Modifier la catégorie" : "Nouvelle catégorie"}

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

                        <Label htmlFor="type">Type</Label>

                        <Select

                            items={typeItems}

                            value={watch("type")}

                            onValueChange={(value) => {

                                if (value && !isEditing) {

                                    setValue(
                                        "type",
                                        value as CategoryFormValues["type"],
                                    );

                                }

                            }}

                        >

                            <SelectTrigger id="type" className="w-full" disabled={isEditing}>

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

                    <div>

                        <Label htmlFor="description">Description (optionnel)</Label>

                        <Input id="description" {...register("description")} />

                    </div>

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