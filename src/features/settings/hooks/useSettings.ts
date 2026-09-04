import { useEffect, useState } from "react";

import { getSettings, saveAllSettings } from "../services/settings.service";
import type { AppSettings } from "../types/settings.types";

const EMPTY: AppSettings = {

    choir_name: "",

    church_name: "",

    currency: "",

    registration_open: true,

};

export function useSettings() {

    const [settings, setSettings] =
        useState<AppSettings>(EMPTY);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {

        loadSettings();

    }, []);

    async function loadSettings() {

        try {
            setLoading(true);

            const result = await getSettings();

            setSettings(result);

        } finally {

            setLoading(false);

        }

    }

    async function saveSettings(values: AppSettings) {

        try {

            setSaving(true);

            await saveAllSettings(values);

            await loadSettings();

        } finally {

            setSaving(false);

        }

    }

    return {

        settings,

        loading,

        saving,

        saveSettings,

    };

}