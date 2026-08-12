import {
    Button
} from "@/shared/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";


interface Props {

    page: number;

    pageSize: number;

    total: number;

    itemLabel?: string;

    onPageChange(
        page: number
    ): void;

    onPageSizeChange?(
        size: number
    ): void;

}


export default function Pagination({

    page,

    pageSize,

    total,

    itemLabel = "résultat(s)",

    onPageChange,

    onPageSizeChange,

}: Props) {


    const totalPages =
        Math.ceil(
            total / pageSize
        );


    const start =
        total === 0
            ? 0
            : page * pageSize + 1;


    const end =
        Math.min(
            (page + 1) * pageSize,
            total
        );


    return (

        <div className="
            flex
            items-center
            justify-between
            mt-6
        ">


            {/* Informations */}

            <div className="
                text-sm
                text-muted-foreground
            ">

                Affichage {start} - {end}
                {" "}sur{" "}
                {total} {itemLabel}

            </div>



            <div className="
                flex
                items-center
                gap-4
            ">


                {/* Nombre par page */}

                {onPageSizeChange && (

                    <Select

                        value={
                            String(pageSize)
                        }

                        onValueChange={(value) =>
                            onPageSizeChange(
                                Number(value)
                            )
                        }

                    >

                        <SelectTrigger className="w-[120px]">

                            <SelectValue />

                        </SelectTrigger>


                        <SelectContent>


                            <SelectItem value="10">

                                10 / page

                            </SelectItem>


                            <SelectItem value="25">

                                25 / page

                            </SelectItem>


                            <SelectItem value="50">

                                50 / page

                            </SelectItem>


                            <SelectItem value="100">

                                100 / page

                            </SelectItem>


                        </SelectContent>

                    </Select>

                )}




                {/* Navigation */}

                <div className="
                    flex
                    items-center
                    gap-2
                ">


                    <Button

                        variant="outline"

                        size="icon"

                        disabled={
                            page === 0
                        }

                        onClick={() =>
                            onPageChange(
                                page - 1
                            )
                        }

                    >

                        <ChevronLeft />

                    </Button>



                    <span className="
                        text-sm
                        font-medium
                    ">

                        Page {page + 1}
                        {" "} / {" "}
                        {totalPages || 1}

                    </span>



                    <Button

                        variant="outline"

                        size="icon"

                        disabled={
                            page + 1 >= totalPages
                        }

                        onClick={() =>
                            onPageChange(
                                page + 1
                            )
                        }

                    >

                        <ChevronRight />

                    </Button>


                </div>


            </div>


        </div>

    );

}