import { useEffect, useState } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar";

import { getAvatarSignedUrl } from "@/features/auth/services/avatar.service";

interface Props {

    path: string | null;

    fallback: string;

    className?: string;

}

export default function ProfileAvatar({

    path,

    fallback,

    className,

}: Props) {

    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {

        if (!path) {

            setUrl(null);

            return;

        }

        getAvatarSignedUrl(path).then(setUrl);

    }, [path]);

    return (

        <Avatar className={className}>

            <AvatarImage src={url ?? undefined} />

            <AvatarFallback>{fallback}</AvatarFallback>

        </Avatar>

    );

}