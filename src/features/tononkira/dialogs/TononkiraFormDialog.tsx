import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Music, X } from "lucide-react";

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

import { useCreateTononkira } from "../hooks/useCreateTononkira";
import { useUpdateTononkira } from "../hooks/useUpdateTononkira";
import type { Tononkira } from "../types/tononkira.types";

const songSchema = z.object({

    title: z.string().min(1, "Le titre est requis"),

    lyrics: z.string().min(1, "La parole est requise"),

});

type SongFormValues = z.infer<typeof songSchema>;

type Props = {

    song: Tononkira | null;

    open: boolean;

    onOpenChange(open: boolean): void;

    onSaved(): void;

};

export default function TononkiraFormDialog({
    song,
    open,
    onOpenChange,
    onSaved,
}: Props) {

    const isEditing = song !== null;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [audioFile, setAudioFile] = useState<File | null>(null);

    const [removeAudio, setRemoveAudio] = useState(false);

    const { submitSong, submitting: creating, error: createError } =
        useCreateTononkira();

    const { submitUpdate, submitting: editing, error: editError } =
        useUpdateTononkira();

    const submitting = creating || editing;

    const error = createError || editError;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SongFormValues>({

        resolver: zodResolver(songSchema),

        defaultValues: { title: "", lyrics: "" },

    });

    useEffect(() => {

        if (open) {

            reset({

                title: song?.title ?? "",

                lyrics: song?.lyrics ?? "",

            });

            setAudioFile(null);

            setRemoveAudio(false);

        }

    }, [open, song]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 20 * 1024 * 1024) {

            alert("Le fichier audio ne doit pas dépasser 20 Mo.");

            return;

        }

        setAudioFile(file);

        setRemoveAudio(false);

    }

    async function onSubmit(values: SongFormValues) {

        const result =

            isEditing

                ? await submitUpdate(song!.id, {

                    title: values.title,

                    lyrics: values.lyrics,

                    audioFile: audioFile ?? undefined,

                    removeAudio,

                })

                : await submitSong({

                    title: values.title,

                    lyrics: values.lyrics,

                    audioFile: audioFile ?? undefined,

                });

        if (result) {

            onOpenChange(false);

            onSaved();

        }

    }

    const hasExistingAudio = isEditing && song?.audio_path && !removeAudio;

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        {isEditing ? "Modifier le chant" : "Nouveau chant"}

                    </DialogTitle>

                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>

                        <Label htmlFor="title">Titre</Label>

                        <Input id="title" {...register("title")} />

                        {errors.title && (

                            <p className="text-sm text-destructive mt-1">
                                {errors.title.message}
                            </p>

                        )}

                    </div>

                    <div>

                        <Label htmlFor="lyrics">Parole</Label>

                        <Textarea

                            id="lyrics"

                            rows={10}

                            className="font-mono text-sm"

                            {...register("lyrics")}

                        />

                        {errors.lyrics && (

                            <p className="text-sm text-destructive mt-1">
                                {errors.lyrics.message}
                            </p>

                        )}

                    </div>

                    <div>

                        <Label>Audio (optionnel, max 20 Mo)</Label>

                        {hasExistingAudio && !audioFile && (

                            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm mb-2">

                                <span className="flex items-center gap-2 text-muted-foreground">

                                    <Music className="h-4 w-4" />

                                    Fichier audio déjà enregistré

                                </span>

                                <button

                                    type="button"

                                    onClick={() => setRemoveAudio(true)}

                                    className="text-destructive hover:underline"

                                >

                                    Retirer

                                </button>

                            </div>

                        )}

                        {audioFile && (

                            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm mb-2">

                                <span className="flex items-center gap-2">

                                    <Music className="h-4 w-4" />

                                    {audioFile.name}

                                </span>

                                <button

                                    type="button"

                                    onClick={() => {

                                        setAudioFile(null);

                                        if (fileInputRef.current) fileInputRef.current.value = "";

                                    }}

                                >

                                    <X className="h-4 w-4" />

                                </button>

                            </div>

                        )}

                        <Input

                            ref={fileInputRef}

                            type="file"

                            accept="audio/*"

                            onChange={handleFileChange}

                        />

                    </div>

                    {error && (

                        <p className="text-sm text-destructive">
                            Une erreur est survenue : {error.message}
                        </p>

                    )}

                    <DialogFooter>

                        <Button type="submit" disabled={submitting}>

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