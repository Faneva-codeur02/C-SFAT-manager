import { supabase } from "@/shared/lib/supabase";

import type { NotificationWithReadStatus } from "../types/notification.types";

export async function getNotifications(): Promise<NotificationWithReadStatus[]> {

    const { data, error } = await supabase
        .from("notifications")
        .select("*, notification_reads(id)")
        .order("created_at", { ascending: false })
        .limit(20);

    if (error) {
        throw error;
    }

    return (data ?? []).map((row: any) => ({

        ...row,

        isRead: (row.notification_reads?.length ?? 0) > 0,

    }));

}

export async function markAsRead(notificationId: string): Promise<void> {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
        .from("notification_reads")
        .upsert(
            { notification_id: notificationId, profile_id: user.id },
            { onConflict: "notification_id,profile_id", ignoreDuplicates: true },
        );

    if (error) {
        throw error;
    }

}

export async function markAllAsRead(notificationIds: string[]): Promise<void> {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || notificationIds.length === 0) return;

    const rows = notificationIds.map((id) => ({

        notification_id: id,

        profile_id: user.id,

    }));

    const { error } = await supabase
        .from("notification_reads")
        .upsert(rows, { onConflict: "notification_id,profile_id", ignoreDuplicates: true });

    if (error) {
        throw error;
    }

}

export async function generateEventReminders(): Promise<void> {

    const { error } = await supabase.rpc("generate_event_reminders");

    if (error) {
        throw error;
    }

}