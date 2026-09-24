import { useState } from "react";

import type { Tononkira } from "../types/tononkira.types";

type DialogType = "form" | "details" | "delete" | null;

export function useTononkiraDialogs() {

    const [selectedSong, setSelectedSong] = useState<Tononkira | null>(null);

    const [dialogType, setDialogType] = useState<DialogType>(null);

    function openCreate() {

        setSelectedSong(null);
        setDialogType("form");

    }

    function openEdit(song: Tononkira) {

        setSelectedSong(song);
        setDialogType("form");

    }

    function openDetails(song: Tononkira) {

        setSelectedSong(song);
        setDialogType("details");

    }

    function openDelete(song: Tononkira) {

        setSelectedSong(song);
        setDialogType("delete");

    }

    function closeDialog() {

        setDialogType(null);

    }

    return {

        selectedSong,

        dialogType,

        openCreate,

        openEdit,

        openDetails,

        openDelete,

        closeDialog,

    };

}