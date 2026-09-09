import type { Database } from "@/types/database";

export type Notification = Database["public"]["Tables"]["notifications"]["Row"];

export interface NotificationWithReadStatus extends Notification {

    isRead: boolean;

}