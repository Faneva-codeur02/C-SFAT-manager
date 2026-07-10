import { Button } from "@/shared/components/ui/button";

import {
    Download
} from "lucide-react";

import type {
    MemberColumnKey
} from "../types/member-column";

import {
    exportSelectedMembersCSV
} from "../services/export-selected-membersCSV.service";


interface Props {

    selectedIds: string[];

    visibleColumns: MemberColumnKey[];

}



export default function ExportSelectedCSVButton({

    selectedIds,

    visibleColumns,

}: Props) {



    function handleExport() {


        exportSelectedMembersCSV(

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

            <Download
                className="mr-2 h-4 w-4"
            />

            Exporter sélection

        </Button>


    );


}