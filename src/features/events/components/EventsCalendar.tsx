import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { buildCalendarDays, toDateKey } from "@/shared/utils/calendar";
import { cn } from "@/shared/utils/utils";

import { useCalendarMonth } from "../hooks/useCalendarMonth";
import { useEventsInRange } from "../hooks/useEventsInRange";
import type { Event, EventStatus, EventType } from "../types/event.types";

const MONTH_LABELS = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const typeColors: Record<string, string> = {

    concert: "bg-blue-100 text-blue-800 border-blue-300",

    repetition: "bg-purple-100 text-purple-800 border-purple-300",

    autre: "bg-amber-100 text-amber-800 border-amber-300",

};

type Props = {

    eventType?: EventType;

    status?: EventStatus;

    onEventClick(event: Event): void;

};

export default function EventsCalendar({
    eventType,
    status,
    onEventClick,
}: Props) {

    const { year, month, nextMonth, prevMonth, goToday } =
        useCalendarMonth();

    const days = buildCalendarDays(year, month);

    const startDate = toDateKey(days[0]);

    const endDate = toDateKey(days[days.length - 1]);

    const { events, loading } =
        useEventsInRange(startDate, endDate, { eventType, status });

    const eventsByDay = new Map<string, Event[]>();

    for (const event of events) {

        const key = event.event_date;

        if (!eventsByDay.has(key)) {

            eventsByDay.set(key, []);

        }

        eventsByDay.get(key)!.push(event);

    }

    const todayKey = toDateKey(new Date());

    return (

        <div className="rounded-lg border bg-card">

            <div className="flex items-center justify-between p-4 border-b">

                <div className="flex items-center gap-2">

                    <Button variant="outline" size="icon" onClick={prevMonth}>

                        <ChevronLeft className="h-4 w-4" />

                    </Button>

                    <Button variant="outline" size="icon" onClick={nextMonth}>

                        <ChevronRight className="h-4 w-4" />

                    </Button>

                    <Button variant="ghost" size="sm" onClick={goToday}>

                        Aujourd'hui

                    </Button>

                </div>

                <h2 className="text-lg font-semibold">

                    {MONTH_LABELS[month]} {year}

                </h2>

                <div className="w-32" />

            </div>

            <div className="grid grid-cols-7 border-b">

                {WEEKDAY_LABELS.map((label) => (

                    <div

                        key={label}

                        className="p-2 text-center text-xs font-medium text-muted-foreground"

                    >

                        {label}

                    </div>

                ))}

            </div>

            <div className="grid grid-cols-7">

                {days.map((day) => {

                    const key = toDateKey(day);

                    const dayEvents = eventsByDay.get(key) ?? [];

                    const isCurrentMonth = day.getMonth() === month;

                    const isToday = key === todayKey;

                    return (

                        <div

                            key={key}

                            className={cn(

                                "min-h-24 border-r border-b p-1.5 last:border-r-0",

                                !isCurrentMonth && "bg-muted/30",

                            )}

                        >

                            <div

                                className={cn(

                                    "text-xs mb-1 inline-flex h-5 w-5 items-center justify-center rounded-full",

                                    isToday && "bg-primary text-primary-foreground font-semibold",

                                    !isCurrentMonth && "text-muted-foreground",

                                )}

                            >

                                {day.getDate()}

                            </div>

                            <div className="space-y-1">

                                {dayEvents.map((event) => (

                                    <button

                                        key={event.id}

                                        onClick={() => onEventClick(event)}

                                        className={cn(

                                            "block w-full truncate rounded border px-1.5 py-0.5 text-left text-xs",

                                            typeColors[event.event_type],

                                            event.status === "cancelled" && "line-through opacity-60",

                                        )}

                                    >

                                        {event.title}

                                    </button>

                                ))}

                            </div>

                        </div>

                    );

                })}

            </div>

            {loading && (

                <div className="p-2 text-center text-xs text-muted-foreground">

                    Chargement...

                </div>

            )}

        </div>

    );

}