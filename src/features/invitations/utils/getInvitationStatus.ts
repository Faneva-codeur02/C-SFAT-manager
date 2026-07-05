import type { InvitationCode } from "@/types";

export function getInvitationStatus(
    invitation: InvitationCode,
) {

    if (invitation.used) {

        return {
            label: "Utilisé",
            variant: "destructive" as const,
        };

    }

    if (
        new Date(invitation.expires_at) <= new Date()
    ) {

        return {
            label: "Expiré",
            variant: "outline" as const,
        };

    }

    return {

        label: "Disponible",
        variant: "secondary" as const,

    };

}