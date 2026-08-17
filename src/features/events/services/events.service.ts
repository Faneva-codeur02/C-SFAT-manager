import { supabase } from "@/shared/lib/supabase";

import type { CreateEventPayload, CreateRecurringEventsPayload, Event, EventStatus, EventType, UpdateEventPayload } from "../types/event.types";
import type { EventFilters, EventPagination } from "../types/event-filter";

export async function getEvents(
    filters: EventFilters,
    pagination: EventPagination,
) {

    let query = supabase
        .from("events")
        .select("*", { count: "exact" });

    if (filters.search) {

        query = query.ilike("title", `%${filters.search.trim()}%`);

    }

    if (filters.eventType) {
        query = query.eq("event_type", filters.eventType);
    }

    if (filters.status) {
        query = query.eq("status", filters.status);
    }

    query = query

        .order("event_date", { ascending: true })

        .range(

            pagination.page * pagination.pageSize,

            pagination.page * pagination.pageSize + pagination.pageSize - 1,

        );

    const { data, error, count } = await query;

    if (error) {
        throw error;
    }

    return {

        events: data ?? [],

        total: count ?? 0,

    };

}

export async function createEvent(
    payload: CreateEventPayload,
): Promise<Event> {

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("events")
        .insert({
            title: payload.title,
            event_type: payload.event_type,
            event_date: payload.event_date,
            location: payload.location ?? null,
            description: payload.description ?? null,
            created_by: user?.id ?? null,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function updateEvent(
    id: string,
    payload: UpdateEventPayload,
): Promise<Event> {

    const { data, error } = await supabase
        .from("events")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function deleteEvent(id: string): Promise<void> {

    const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }

}

export async function createRecurringEvents(
    payload: CreateRecurringEventsPayload,
): Promise<Event[]> {

    const { data: { user } } = await supabase.auth.getUser();

    const rows = Array.from({ length: payload.occurrences }, (_, i) => {

        const date = new Date(payload.event_date + "T00:00:00");

        date.setDate(date.getDate() + i * 7);

        return {

            title: payload.title,

            event_type: payload.event_type,

            event_date: date.toISOString().slice(0, 10),

            location: payload.location ?? null,

            description: payload.description ?? null,

            created_by: user?.id ?? null,

        };

    });

    const { data, error } = await supabase
        .from("events")
        .insert(rows)
        .select();

    if (error) {
        throw error;
    }

    return data ?? [];

}

export async function getEventsInRange(
    startDate: string,
    endDate: string,
    filters: { eventType?: EventType; status?: EventStatus },
): Promise<Event[]> {

    let query = supabase
        .from("events")
        .select("*")
        .gte("event_date", startDate)
        .lte("event_date", endDate);

    if (filters.eventType) {
        query = query.eq("event_type", filters.eventType);
    }

    if (filters.status) {
        query = query.eq("status", filters.status);
    }

    const { data, error } = await query.order("event_date", { ascending: true });

    if (error) {
        throw error;
    }

    return data ?? [];

}