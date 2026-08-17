import { useState } from "react";

import { updateEvent } from "../services/events.service";

export function useUpdateEventStatus() {

    const [updating, setUpdating] =
        useState(false);

    async function changeStatus(

        id: string,

        status: "planned" | "completed" | "cancelled",

    ) {

        try {

            setUpdating(true);

            await updateEvent(id, { status });

        } finally {

            setUpdating(false);

        }

    }

    return {

        changeStatus,

        updating,

    };

}