import { useEffect, useState } from "react";

import { getPublicBranding } from "@/features/settings/services/settings.service";
import type { PublicBranding } from "@/features/settings/services/settings.service";

const FALLBACK: PublicBranding = {

    choir_name: "C-SFAT",

    church_name: "",

};

export function usePublicBranding() {

    const [branding, setBranding] =
        useState<PublicBranding>(FALLBACK);

    useEffect(() => {

        getPublicBranding()

            .then(setBranding)

            .catch(() => setBranding(FALLBACK));

    }, []);

    return branding;

}