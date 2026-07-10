import { Button } from "@/shared/components/ui/button";

import {
    FileDown
} from "lucide-react";


import type {
    MemberColumnKey
} from "../types/member-column";


import {
    exportMembersPDF
} from "../services/export-selected-members-pdf.service";
import type { Profile } from "@/types";



interface Props {


    members: Profile[];


    visibleColumns: MemberColumnKey[];


}



export default function ExportSelectedPDFButton({

    members,

    visibleColumns,

}: Props) {



    async function handleExport() {


        await exportMembersPDF(
            members,
            visibleColumns
        );


    }



    return (

        <Button

            variant="outline"

            disabled={
                members.length === 0
            }

            onClick={handleExport}

        >


            <FileDown

                className="mr-2 h-4 w-4"

            />


            PDF


        </Button>

    );


}