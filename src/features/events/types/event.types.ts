import type { Database } from "@/types/database";

export type Event = Database["public"]["Tables"]["events"]["Row"];

export type EventType = Database["public"]["Enums"]["event_type"];

export type EventStatus = Database["public"]["Enums"]["events_status"];

export interface CreateEventPayload {

    title: string;

    event_type: EventType;

    event_date: string;

    location?: string;

    description?: string;

}

export interface UpdateEventPayload extends Partial<CreateEventPayload> {

    status?: EventStatus;

}

export interface CreateRecurringEventsPayload {

    title: string;

    event_type: EventType;

    event_date: string;

    occurrences: number;

    location?: string;

    description?: string;

}