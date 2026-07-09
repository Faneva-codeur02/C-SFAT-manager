import type {
    MemberColumnKey,
} from "../types/member-column";


export interface MemberColumn {

    key: MemberColumnKey;

    label: string;

    defaultVisible: boolean;

}


export const memberColumns: MemberColumn[] = [

    {
        key: "nom",
        label: "Nom",
        defaultVisible: true,
    },


    {
        key: "prenom",
        label: "Prénom",
        defaultVisible: true,
    },


    {
        key: "email",
        label: "Email",
        defaultVisible: false,
    },


    {
        key: "voicePart",
        label: "Pupitre",
        defaultVisible: true,
    },


    {
        key: "status",
        label: "Statut",
        defaultVisible: true,
    },


    {
        key: "createdAt",
        label: "Date inscription",
        defaultVisible: false,
    },

];