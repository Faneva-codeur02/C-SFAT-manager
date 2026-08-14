import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ContributionsTableSkeleton() {

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>
                        <Skeleton className="h-4 w-32" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-24" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-16" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-16" />
                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {Array.from({ length: 8 }).map((_, index) => (

                    <TableRow key={index}>

                        {Array.from({ length: 7 }).map((__, cell) => (

                            <TableCell key={cell}>

                                <Skeleton className="h-5 w-full" />

                            </TableCell>

                        ))}

                    </TableRow>

                ))}

            </TableBody>

        </Table>

    );

}