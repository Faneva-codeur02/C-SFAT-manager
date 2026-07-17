import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { Skeleton } from "@/shared/components/ui/skeleton";

export default function InvitationTableSkeleton() {

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead className="w-12">
                        <Skeleton className="h-4 w-4" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-24" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-24" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-24" />
                    </TableHead>

                    <TableHead>
                        <Skeleton className="h-4 w-28" />
                    </TableHead>

                    <TableHead className="text-center">
                        <Skeleton className="mx-auto h-4 w-16" />
                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {Array.from({ length: 8 }).map((_, index) => (

                    <TableRow key={index}>

                        <TableCell>
                            <Skeleton className="h-4 w-4" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="h-6 w-32 rounded-md" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="h-4 w-36" />
                        </TableCell>

                        <TableCell className="text-center">
                            <Skeleton className="mx-auto h-8 w-8 rounded-md" />
                        </TableCell>

                    </TableRow>

                ))}

            </TableBody>

        </Table>

    );

}