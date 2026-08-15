import { useState } from "react";

import type { SelectedMember } from "../types/contribution.types";

type DialogType = "history" | "payment" | null;

export function useContributionDialogs() {

    const [selectedMember, setSelectedMember] =
        useState<SelectedMember | null>(null);

    const [dialogType, setDialogType] =
        useState<DialogType>(null);

    function openHistory(member: SelectedMember) {

        setSelectedMember(member);
        setDialogType("history");

    }

    function openPayment(member: SelectedMember) {

        setSelectedMember(member);
        setDialogType("payment");

    }

    function closeDialog() {

        setDialogType(null);

    }

    return {

        selectedMember,

        dialogType,

        openHistory,

        openPayment,

        closeDialog,

    };

}