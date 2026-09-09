import { useEffect, useState } from "react";

import { supabase } from "@/shared/lib/supabase";
import { useAuth } from "@/features/auth/context/AuthContext";

import {
    getNotifications,
    markAsRead,
    markAllAsRead,
} from "../services/notifications.service";
import type { NotificationWithReadStatus } from "../types/notification.types";

export function useNotifications() {

    const { profile } = useAuth();

    const [notifications, setNotifications] =
        useState<NotificationWithReadStatus[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadNotifications();

    }, []);

    // Abonnement temps réel : uniquement les notifications
    // ciblant le rôle de l'utilisateur connecté
    useEffect(() => {

        if (!profile) return;

        const channel = supabase

            .channel("notifications-realtime")

            .on(

                "postgres_changes",

                {
                    event: "INSERT",
                    schema: "public",
                    table: "notifications",
                    filter: `target_role=eq.${profile.role}`,
                },

                (payload) => {

                    setNotifications((current) => [

                        { ...(payload.new as any), isRead: false },

                        ...current,

                    ]);

                },

            )

            .subscribe();

        return () => {

            supabase.removeChannel(channel);

        };

    }, [profile?.role]);

    async function loadNotifications() {

        try {
            setLoading(true);

            const result = await getNotifications();

            setNotifications(result);

        } finally {

            setLoading(false);

        }

    }

    async function handleMarkAsRead(id: string) {

        setNotifications((current) =>

            current.map((n) => (n.id === id ? { ...n, isRead: true } : n)),

        );

        await markAsRead(id);

    }

    async function handleMarkAllAsRead() {

        const unreadIds = notifications

            .filter((n) => !n.isRead)

            .map((n) => n.id);

        if (unreadIds.length === 0) return;

        setNotifications((current) =>

            current.map((n) => ({ ...n, isRead: true })),

        );

        await markAllAsRead(unreadIds);

    }

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return {

        notifications,

        unreadCount,

        loading,

        markAsRead: handleMarkAsRead,

        markAllAsRead: handleMarkAllAsRead,

    };

}