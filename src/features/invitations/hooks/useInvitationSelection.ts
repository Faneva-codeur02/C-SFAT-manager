import { useState } from "react";

export function useInvitationSelection() {

    const [

        selectedIds,

        setSelectedIds,

    ] = useState<string[]>([]);

    function toggle(id: string) {

        setSelectedIds(previous =>

            previous.includes(id)

                ? previous.filter(x => x !== id)

                : [...previous, id]

        );

    }

    function toggleAll(ids: string[]) {

        setSelectedIds(previous => {

            const allSelected =

                ids.every(id =>

                    previous.includes(id)

                );

            if (allSelected) {

                return previous.filter(

                    id => !ids.includes(id)

                );

            }

            const merged = [

                ...previous,

                ...ids,

            ];

            return [...new Set(merged)];

        });

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