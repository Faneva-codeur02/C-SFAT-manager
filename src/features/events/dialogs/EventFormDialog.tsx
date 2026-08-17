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
import { Textarea } from "@/shared/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import { Checkbox } from "@/shared/components/ui/checkbox";
import { useCreateRecurringEvents } from "../hooks/useCreateRecurringEvents";

import { useCreateEvent } from "../hooks/useCreateEvent";
import { useEditEvent } from "../hooks/useEditEvent";
import type { Event } from "../types/event.types";

const eventSchema = z.object({

    title: z.string().min(1, "Le titre est requis"),

    event_type: z.enum(["concert", "repetition", "autre"], {
        message: "Sélectionne un type",
    }),

    event_date: z.string().min(1, "La date est requise"),

    location: z.string().optional(),

    description: z.string().optional(),

    is_recurring: z.boolean().optional(),

    occurrences: z.number().min(2).max(52).optional(),

});

type EventFormValues = z.infer<typeof eventSchema>;

const typeItems = [

    { value: "concert", label: "Concert" },

    { value: "repetition", label: "Répétition" },

    { value: "autre", label: "Autre" },

];

type Props = {

    event: Event | null;

    open: boolean;

    onOpenChange(open: boolean): void;

    onSaved(): void;

};

export default function EventFormDialog({
    event,
    open,
    onOpenChange,
    onSaved,
}: Props) {

    const isEditing = event !== null;

    const { submitEvent, submitting: creating, error: createError } =
        useCreateEvent();

    const { submitEdit, submitting: editing, error: editError } =
        useEditEvent();

    const { submitRecurring, submitting: submittingRecurring, error: recurringError } =
        useCreateRecurringEvents();

    const submitting = creating || editing || submittingRecurring;

    const error = createError || editError || recurringError;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EventFormValues>({

        resolver: zodResolver(eventSchema),

        defaultValues: {

            title: "",

            event_type: "repetition",

            event_date: "",

            location: "",

            description: "",

            is_recurring: false,

            occurrences: 8,

        },

    });

    // Repeuple le formulaire quand on ouvre en mode édition
    useEffect(() => {

        if (open) {

            reset({

                title: event?.title ?? "",

                event_type: event?.event_type ?? "repetition",

                event_date: event?.event_date ?? "",

                location: event?.location ?? "",

                description: event?.description ?? "",

                is_recurring: false,

                occurrences: 8,

            });

        }

    }, [open, event]);

    async function onSubmit(values: EventFormValues) {

        if (!isEditing && values.is_recurring) {

            const result = await submitRecurring({

                title: values.title,

                event_type: values.event_type,

                event_date: values.event_date,

                occurrences: values.occurrences ?? 8,

                location: values.location || undefined,

                description: values.description || undefined,

            });

            if (result) {

                onOpenChange(false);

                onSaved();

            }

            return;

        }

        const payload = {

            title: values.title,

            event_type: values.event_type,

            event_date: values.event_date,

            location: values.location || undefined,

            description: values.description || undefined,

        };

        const result =

            isEditing

                ? await submitEdit(event!.id, payload)

                : await submitEvent(payload);

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

                        {isEditing ? "Modifier l'évènement" : "Nouvel évènement"}

                    </DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>

                        <Label htmlFor="title">Titre</Label>

                        <Input
                            id="title"
                            {...register("title")}
                        />

                        {errors.title && (

                            <p className="text-sm text-destructive mt-1">
                                {errors.title.message}
                            </p>

                        )}

                    </div>

                    <div>

                        <Label htmlFor="event_type">Type</Label>

                        <Select

                            items={typeItems}

                            value={watch("event_type")}

                            onValueChange={(value) => {

                                if (value) {

                                    setValue(
                                        "event_type",
                                        value as EventFormValues["event_type"],
                                    );

                                }

                            }}

                        >

                            <SelectTrigger id="event_type" className="w-full">

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

                    </div>

                    <div>

                        <Label htmlFor="event_date">Date</Label>

                        <Input
                            id="event_date"
                            type="date"
                            {...register("event_date")}
                        />

                        {errors.event_date && (

                            <p className="text-sm text-destructive mt-1">
                                {errors.event_date.message}
                            </p>

                        )}

                    </div>

                    {!isEditing && (

                        <div className="flex items-center gap-2">

                            <Checkbox

                                id="is_recurring"

                                checked={watch("is_recurring")}

                                onCheckedChange={(checked) =>

                                    setValue("is_recurring", checked === true)

                                }

                            />

                            <Label htmlFor="is_recurring" className="cursor-pointer">

                                Répéter chaque semaine

                            </Label>

                        </div>

                    )}

                    {!isEditing && watch("is_recurring") && (

                        <div>

                            <Label htmlFor="occurrences">Nombre de séances</Label>

                            <Input
                                id="occurrences"
                                type="number"
                                min={2}
                                max={52}
                                {...register("occurrences", { valueAsNumber: true })}
                            />

                            <p className="text-xs text-muted-foreground mt-1">

                                {watch("event_date") && (() => {

                                    const start = new Date(watch("event_date") + "T00:00:00");

                                    const count = watch("occurrences") ?? 8;

                                    const end = new Date(start);

                                    end.setDate(end.getDate() + (count - 1) * 7);

                                    return `Du ${start.toLocaleDateString("fr-FR")} au ${end.toLocaleDateString("fr-FR")}`;

                                })()}

                            </p>

                        </div>

                    )}

                    <div>

                        <Label htmlFor="location">Lieu (optionnel)</Label>

                        <Input
                            id="location"
                            {...register("location")}
                        />

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

                            {submitting

                                ? "Enregistrement..."

                                : isEditing ? "Enregistrer" : "Créer"}

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>

    );

}