import { Button } from "@/shared/components/ui/button";

import {
    Download,
} from "lucide-react";

import {
    exportMembersToExcel,
} from "../services/export-member-excel.service";


import type { Profile } from "@/types";

import type {
    MemberColumnKey,
} from "../types/member-column";



interface Props {

    members: Profile[];

    visibleColumns: MemberColumnKey[];

}



export default function ExportMembersButton({

    members,

    visibleColumns,

}: Props) {


    return (

        <Button

            variant="outline"

            onClick={() =>
                exportMembersToExcel(
                    members,
                    visibleColumns
                )
            }

        >

            <Download
                className="mr-2 h-4 w-4"
            />


            Exporter


        </Button>


    );


}