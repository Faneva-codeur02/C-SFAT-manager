import { Button } from "@/shared/components/ui/button";

import {
    FileText,
} from "lucide-react";


import {
    exportMembersToCSV,
} from "../services/export-member-csv.service";



import type {
    MemberColumnKey,
} from "../types/member-column";
import type { MemberFilters } from "../types/member-filter";



interface Props {

    filters: MemberFilters;

    visibleColumns: MemberColumnKey[];

}



export default function ExportCSVButton({

    filters,

    visibleColumns,

}: Props) {


    return (

        <Button

            variant="outline"

            onClick={() =>

                exportMembersToCSV(

                    filters,

                    visibleColumns

                )

            }

        >


            <FileText
                className="mr-2 h-4 w-4"
            />


            CSV


        </Button>

    );


}