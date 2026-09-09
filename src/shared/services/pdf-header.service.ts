import { getSettings } from "@/features/settings/services/settings.service";

export async function getPdfHeaderText(): Promise<string> {

    const settings = await getSettings();

    return `${settings.choir_name} — Chorale ${settings.church_name}`;

}