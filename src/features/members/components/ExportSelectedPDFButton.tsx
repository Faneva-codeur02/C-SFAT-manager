import { Button } from "@/shared/components/ui/button";

import {
    FileDown
} from "lucide-react";


import type {
    MemberColumnKey
} from "../types/member-column";


import {
    exportSelectedMembersPDF
} from "../services/export-selected-members-pdf.service";



interface Props {


    selectedIds: string[];


    visibleColumns: MemberColumnKey[];


}



export default function ExportSelectedPDFButton({

    selectedIds,

    visibleColumns,

}: Props) {



    async function handleExport() {


        await exportSelectedMembersPDF(

            selectedIds,

            visibleColumns

        );


    }



    return (

        <Button

            variant="outline"

            disabled={
                selectedIds.length === 0
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