import { supabase } from "@/shared/lib/supabase";

import type { AppSettings } from "../types/settings.types";

export async function getSettings(): Promise<AppSettings> {

    const { data, error } = await supabase
        .from("settings")
        .select("*");

    if (error) {
        throw error;
    }

    const map = new Map(

        (data ?? []).map((row) => [row.key, row.value]),

    );

    return {

        choir_name: map.get("choir_name") ?? "",

        church_name: map.get("church_name") ?? "",

        currency: map.get("currency") ?? "",

        registration_open: map.get("registration_open") === "true",

        monthly_contribution_amount: Number(map.get("monthly_contribution_amount") ?? 0),

    };

}

export async function updateSetting(
    key: string,
    value: string,
): Promise<void> {

    const { error } = await supabase
        .from("settings")
        .update({ value })
        .eq("key", key);

    if (error) {
        throw error;
    }

}

export async function saveAllSettings(
    values: AppSettings,
): Promise<void> {

    await Promise.all([

        updateSetting("choir_name", values.choir_name),

        updateSetting("church_name", values.church_name),

        updateSetting("currency", values.currency),

        updateSetting("registration_open", values.registration_open ? "true" : "false"),

        updateSetting("monthly_contribution_amount", String(values.monthly_contribution_amount)),

    ]);

}

export async function isRegistrationOpen(): Promise<boolean> {

    const { data, error } = await supabase.rpc("is_registration_open");

    if (error) {
        throw error;
    }

    return data ?? true;

}