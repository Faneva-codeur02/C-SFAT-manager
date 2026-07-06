import { useState } from "react";

export function useMemberSelection() {

    const [selectedIds, setSelectedIds] =
        useState<string[]>([]);

    function toggle(id: string) {

        setSelectedIds(current =>

            current.includes(id)

                ? current.filter(x => x !== id)

                : [...current, id]

        );

    }

    function toggleAll(ids: string[]) {

        if (selectedIds.length === ids.length) {

            setSelectedIds([]);

            return;

        }

        setSelectedIds(ids);

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