import { useEffect, useState } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar";

import { getAvatarSignedUrl } from "@/features/auth/services/avatar.service";

import PhotoLightbox from "./PhotoLightbox";

interface Props {

    path: string | null;

    fallback: string;

    className?: string;

    clickable?: boolean;

}

export default function ProfileAvatar({

    path,

    fallback,

    className,

    clickable = false,

}: Props) {

    const [url, setUrl] = useState<string | null>(null);

    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {

        if (!path) {

            setUrl(null);

            return;

        }

        getAvatarSignedUrl(path).then(setUrl);

    }, [path]);

    return (

        <>

            <Avatar

                className={

                    clickable && url

                        ? `${className ?? ""} cursor-zoom-in`

                        : className

                }

                onClick={() => {

                    if (clickable && url) {

                        setLightboxOpen(true);

                    }

                }}

            >

                <AvatarImage src={url ?? undefined} />

                <AvatarFallback>{fallback}</AvatarFallback>

            </Avatar>

            {clickable && (

                <PhotoLightbox

                    url={url}

                    open={lightboxOpen}

                    onOpenChange={setLightboxOpen}

                />

            )}

        </>

    );

}