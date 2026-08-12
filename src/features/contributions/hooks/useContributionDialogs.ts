import { useState } from "react";

import type { MemberContributionWithDetails } from "../types/contribution.types";

type DialogType = "history" | "payment" | null;

export function useContributionDialogs() {

    const [selectedContribution, setSelectedContribution] =
        useState<MemberContributionWithDetails | null>(null);

    const [dialogType, setDialogType] =
        useState<DialogType>(null);

    function openHistory(
        contribution: MemberContributionWithDetails,
    ) {

        setSelectedContribution(contribution);
        setDialogType("history");

    }

    function openPayment(
        contribution: MemberContributionWithDetails,
    ) {

        setSelectedContribution(contribution);
        setDialogType("payment");

    }

    function closeDialog() {

        setDialogType(null);

    }

    return {

        selectedContribution,

        dialogType,

        openHistory,

        openPayment,

        closeDialog,

    };

}