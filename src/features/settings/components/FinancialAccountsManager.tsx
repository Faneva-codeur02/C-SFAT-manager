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

import { useFinancialAccounts } from "@/features/accounting/hooks/useFinancialAccounts";
import FinancialAccountFormDialog from "../dialogs/FinancialAccountFormDialog";
import type { FinancialAccount } from "@/features/accounting/types/accounting.types";

const typeLabels: Record<string, string> = {

    cash: "Espèces",

    bank: "Banque",

    mobile_money: "Mobile Money",

};

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

export default function FinancialAccountsManager() {

    const { accounts, loading, reloadAccounts } =
        useFinancialAccounts();

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState<FinancialAccount | null>(null);

    function openCreate() {

        setSelected(null);
        setOpen(true);

    }

    function openEdit(account: FinancialAccount) {

        setSelected(account);
        setOpen(true);

    }

    return (

        <div>

            <div className="flex items-center justify-between mb-3">

                <h2 className="text-lg font-semibold">Comptes financiers</h2>

                <Button size="sm" onClick={openCreate}>

                    Nouveau compte

                </Button>

            </div>

            <div className="rounded-lg border bg-card">

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead>Nom</TableHead>

                            <TableHead>Type</TableHead>

                            <TableHead className="text-right">Solde actuel</TableHead>

                            <TableHead>Statut</TableHead>

                            <TableHead className="text-right">Actions</TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {loading ? (

                            <TableRow>

                                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">

                                    Chargement...

                                </TableCell>

                            </TableRow>

                        ) : (

                            accounts.map((account) => (

                                <TableRow key={account.id}>

                                    <TableCell>{account.name}</TableCell>

                                    <TableCell>{typeLabels[account.account_type]}</TableCell>

                                    <TableCell className="text-right">

                                        {formatAmount(account.current_balance)}

                                    </TableCell>

                                    <TableCell>

                                        {account.is_active ? (

                                            <Badge>Actif</Badge>

                                        ) : (

                                            <Badge variant="outline">Inactif</Badge>

                                        )}

                                    </TableCell>

                                    <TableCell className="text-right">

                                        <Button

                                            variant="ghost"

                                            size="icon"

                                            onClick={() => openEdit(account)}

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

            <FinancialAccountFormDialog

                account={selected}

                open={open}

                onOpenChange={setOpen}

                onSaved={reloadAccounts}

            />

        </div>

    );

}