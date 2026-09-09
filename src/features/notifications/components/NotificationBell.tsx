import { useNavigate } from "react-router-dom";
import { Bell, UserPlus, Wallet, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/utils/utils";

import { useNotifications } from "../hooks/useNotifications";
import type { Notification } from "../types/notification.types";

const typeIcons: Record<Notification["type"], typeof Bell> = {

    registration: UserPlus,

    payment: Wallet,

    event_reminder: CalendarClock,

};

function timeAgo(dateString: string): string {

    const diffMs = Date.now() - new Date(dateString).getTime();

    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "à l'instant";

    if (diffMin < 60) return `il y a ${diffMin} min`;

    const diffH = Math.floor(diffMin / 60);

    if (diffH < 24) return `il y a ${diffH} h`;

    const diffD = Math.floor(diffH / 24);

    return `il y a ${diffD} j`;

}

export default function NotificationBell() {

    const navigate = useNavigate();

    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
    } = useNotifications();

    async function handleClick(notification: Notification & { isRead: boolean }) {

        if (!notification.isRead) {

            await markAsRead(notification.id);

        }

        if (notification.link) {

            navigate(notification.link);

        }

    }

    return (

        <Popover>

            <PopoverTrigger

                render={

                    <Button variant="ghost" size="icon" className="relative">

                        <Bell size={18} />

                        {unreadCount > 0 && (

                            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">

                                {unreadCount > 9 ? "9+" : unreadCount}

                            </span>

                        )}

                    </Button>

                }

            />

            <PopoverContent align="end" className="w-80 p-0">

                <div className="flex items-center justify-between border-b px-4 py-3">

                    <span className="font-semibold text-sm">Notifications</span>

                    {unreadCount > 0 && (

                        <button

                            onClick={() => markAllAsRead()}

                            className="text-xs text-primary hover:underline"

                        >

                            Tout marquer comme lu

                        </button>

                    )}

                </div>

                <div className="max-h-96 overflow-y-auto">

                    {notifications.length === 0 ? (

                        <p className="p-4 text-center text-sm text-muted-foreground">

                            Aucune notification.

                        </p>

                    ) : (

                        notifications.map((notification) => {

                            const Icon = typeIcons[notification.type];

                            return (

                                <button

                                    key={notification.id}

                                    onClick={() => handleClick(notification)}

                                    className={cn(

                                        "flex w-full items-start gap-3 border-b px-4 py-3 text-left text-sm last:border-0 hover:bg-accent",

                                        !notification.isRead && "bg-accent/40",

                                    )}

                                >

                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">

                                        <Icon size={14} />

                                    </div>

                                    <div className="flex-1 min-w-0">

                                        <div className="flex items-center gap-2">

                                            <span className="font-medium">

                                                {notification.title}

                                            </span>

                                            {!notification.isRead && (

                                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />

                                            )}

                                        </div>

                                        <p className="text-muted-foreground truncate">

                                            {notification.message}

                                        </p>

                                        <span className="text-xs text-muted-foreground">

                                            {timeAgo(notification.created_at)}

                                        </span>

                                    </div>

                                </button>

                            );

                        })

                    )}

                </div>

            </PopoverContent>

        </Popover>

    );

}