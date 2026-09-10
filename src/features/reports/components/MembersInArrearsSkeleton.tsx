import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { Skeleton } from "@/shared/components/ui/skeleton";

export default function MembersInArrearsSkeleton() {

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>
                        <Skeleton className="h-4 w-24" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-28" />
                    </TableHead>

                    <TableHead className="text-right">
                        <Skeleton className="h-4 w-24 ml-auto" />
                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {Array.from({ length: 6 }).map((_, index) => (

                    <TableRow key={index}>

                        <TableCell>
                            <Skeleton className="h-5 w-32" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="h-5 w-8" />
                        </TableCell>

                        <TableCell className="text-right">
                            <Skeleton className="h-5 w-20 ml-auto" />
                        </TableCell>

                    </TableRow>

                ))}

            </TableBody>

        </Table>

    );

}