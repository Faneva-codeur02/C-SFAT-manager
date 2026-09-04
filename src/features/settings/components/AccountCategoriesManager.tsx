import { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Pencil } from "lucide-react";

import { useAccountCategories } from "@/features/accounting/hooks/useAccountCategories";
import AccountCategoryFormDialog from "../dialogs/AccountCategoryFormDialog";
import type { AccountCategory } from "@/features/accounting/types/accounting.types";

export default function AccountCategoriesManager() {

    const { categories, loading, reloadCategories } =
        useAccountCategories();

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState<AccountCategory | null>(null);

    function openCreate() {

        setSelected(null);
        setOpen(true);

    }

    function openEdit(category: AccountCategory) {

        setSelected(category);
        setOpen(true);

    }

    return (

        <div className="mt-8">

            <div className="flex items-center justify-between mb-3">

                <h2 className="text-lg font-semibold">Catégories comptables</h2>

                <Button size="sm" onClick={openCreate}>

                    Nouvelle catégorie

                </Button>

            </div>

            <div className="rounded-lg border bg-card">

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead>Nom</TableHead>

                            <TableHead>Type</TableHead>

                            <TableHead>Description</TableHead>

                            <TableHead className="text-right">Actions</TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {loading ? (

                            <TableRow>

                                <TableCell colSpan={4} className="text-center text-muted-foreground py-6">

                                    Chargement...

                                </TableCell>

                            </TableRow>

                        ) : (

                            categories.map((category) => (

                                <TableRow key={category.id}>

                                    <TableCell>{category.name}</TableCell>

                                    <TableCell>

                                        {category.type === "income" ? (

                                            <Badge>Recette</Badge>

                                        ) : (

                                            <Badge variant="destructive">Dépense</Badge>

                                        )}

                                    </TableCell>

                                    <TableCell className="text-muted-foreground">

                                        {category.description ?? "-"}

                                    </TableCell>

                                    <TableCell className="text-right">

                                        <Button

                                            variant="ghost"

                                            size="icon"

                                            onClick={() => openEdit(category)}

                                        >

                                            <Pencil className="h-4 w-4" />

                                        </Button>

                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            </div>

            <AccountCategoryFormDialog

                category={selected}

                open={open}

                onOpenChange={setOpen}

                onSaved={reloadCategories}

            />

        </div>

    );

}