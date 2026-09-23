import { useEffect, useState } from "react";

import { getAudioSignedUrl } from "../services/tononkira.service";

export function useAudioUrl(path: string | null) {

    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {

        if (!path) {

            setUrl(null);

            return;

        }

        getAudioSignedUrl(path).then(setUrl);

    }, [path]);

    return url;

}