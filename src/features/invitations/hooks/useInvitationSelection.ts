import { useState } from "react";

export function useInvitationSelection() {

    const [selectedIds, setSelectedIds] =
        useState<string[]>([]);

    function toggle(id: string) {

        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );

    }

    function toggleAll(ids: string[]) {

        setSelectedIds(prev =>

            prev.length === ids.length
                ? []
                : ids

        );

    }

    function clear() {

        setSelectedIds([]);

    }

    return {

        selectedIds,

        toggle,

        toggleAll,

        clear,

    };

}