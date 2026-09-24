import { Eye, Pencil, Trash2, Music } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

import { usePermission } from "@/features/auth/hooks/usePermission";
import { PERMISSIONS } from "@/auth/permissions";

import type { Tononkira } from "../types/tononkira.types";

type Props = {

    songs: Tononkira[];

    onView(song: Tononkira): void;

    onEdit(song: Tononkira): void;

    onDelete(song: Tononkira): void;

};

export default function TononkiraTable({
    songs,
    onView,
    onEdit,
    onDelete,
}: Props) {

    const { can } = usePermission();

    const canEdit = can(PERMISSIONS.TONONKIRA_EDIT);

    return (

        <div className="rounded-lg border bg-card">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Titre</TableHead>

                        <TableHead>Audio</TableHead>

                        <TableHead className="text-right">Actions</TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {songs.map((song) => (

                        <TableRow key={song.id}>

                            <TableCell className="font-medium">

                                {song.title}

                            </TableCell>

                            <TableCell>

                                {song.audio_path ? (

                                    <Badge variant="secondary">

                                        <Music className="mr-1 h-3 w-3" />

                                        Disponible

                                    </Badge>

                                ) : (

                                    <span className="text-muted-foreground text-sm">-</span>

                                )}

                            </TableCell>

                            <TableCell className="text-right">

                                <div className="flex justify-end gap-1">

                                    <Button

                                        variant="ghost"

                                        size="icon"

                                        onClick={() => onView(song)}

                                    >

                                        <Eye className="h-4 w-4" />

                                    </Button>

                                    {canEdit && (

                                        <>

                                            <Button

                                                variant="ghost"

                                                size="icon"

                                                onClick={() => onEdit(song)}

                                            >

                                                <Pencil className="h-4 w-4" />

                                            </Button>

                                            <Button

                                                variant="ghost"

                                                size="icon"

                                                onClick={() => onDelete(song)}

                                            >

                                                <Trash2 className="h-4 w-4" />

                                            </Button>

                                        </>

                                    )}

                                </div>

                            </TableCell>

                        </TableRow>

                    ))}

                    {songs.length === 0 && (

                        <TableRow>

                            <TableCell colSpan={3} className="text-center text-muted-foreground py-8">

                                Aucun chant trouvé.

                            </TableCell>

                        </TableRow>

                    )}

                </TableBody>

            </Table>

        </div>

    );

}