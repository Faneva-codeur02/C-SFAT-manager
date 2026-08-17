import { useState } from "react";

export function useCalendarMonth() {

    const today = new Date();

    const [year, setYear] = useState(today.getFullYear());

    const [month, setMonth] = useState(today.getMonth());

    function nextMonth() {

        if (month === 11) {

            setMonth(0);
            setYear((y) => y + 1);

        } else {

            setMonth((m) => m + 1);

        }

    }

    function prevMonth() {

        if (month === 0) {

            setMonth(11);
            setYear((y) => y - 1);

        } else {

            setMonth((m) => m - 1);

        }

    }

    function goToday() {

        setYear(today.getFullYear());
        setMonth(today.getMonth());

    }

    return {

        year,

        month,

        nextMonth,

        prevMonth,

        goToday,

    };

}