import { useState } from "react";

import type { Profile } from "@/types";

export function useMemberDialogs() {

    const [selectedMember, setSelectedMember] =
        useState<Profile | null>(null);

    const [dialogType, setDialogType] =
        useState<
            "view" |
            "edit" |
            "toggle" |
            null
        >(null);

    function openView(member: Profile) {

        setSelectedMember(member);

        setDialogType("view");

    }

    function openEdit(member: Profile) {

        setSelectedMember(member);

        setDialogType("edit");

    }

    function openToggle(member: Profile) {

        setSelectedMember(member);

        setDialogType("toggle");

    }

    function closeDialog() {

        setSelectedMember(null);

        setDialogType(null);

    }

    return {

        selectedMember,

        dialogType,

        openView,

        openEdit,

        openToggle,

        closeDialog,

    };

}