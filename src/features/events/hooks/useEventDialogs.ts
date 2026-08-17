import { useState } from "react";

import type { Event } from "../types/event.types";

type DialogType = "form" | "details" | "delete" | null;

export function useEventDialogs() {

    const [selectedEvent, setSelectedEvent] =
        useState<Event | null>(null);

    const [dialogType, setDialogType] =
        useState<DialogType>(null);

    function openCreate() {

        setSelectedEvent(null);
        setDialogType("form");

    }

    function openEdit(event: Event) {

        setSelectedEvent(event);
        setDialogType("form");

    }

    function openDetails(event: Event) {

        setSelectedEvent(event);
        setDialogType("details");

    }

    function openDelete(event: Event) {

        setSelectedEvent(event);
        setDialogType("delete");

    }

    function closeDialog() {

        setDialogType(null);

    }

    return {

        selectedEvent,

        dialogType,

        openCreate,

        openEdit,

        openDetails,

        openDelete,

        closeDialog,

    };

}