import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { Skeleton } from "@/shared/components/ui/skeleton";

function SkeletonSection() {

    return (

        <div className="rounded-lg border bg-card mb-4">

            <div className="px-4 py-2 border-b">

                <Skeleton className="h-4 w-40" />

            </div>

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>
                            <Skeleton className="h-4 w-24" />
                        </TableHead>

                        <TableHead className="text-right">
                            <Skeleton className="h-4 w-20 ml-auto" />
                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {Array.from({ length: 3 }).map((_, index) => (

                        <TableRow key={index}>

                            <TableCell>
                                <Skeleton className="h-5 w-32" />
                            </TableCell>

                            <TableCell className="text-right">
                                <Skeleton className="h-5 w-20 ml-auto" />
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </div>

    );

}

export default function CategoryReportSkeleton() {

    return (

        <div>

            <SkeletonSection />

            <SkeletonSection />

        </div>

    );

}