import { Eye, Wallet } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import MonthSquares from "./MonthSquares";
import type { MemberYearGridRow, SelectedMember } from "../types/contribution.types";

const MONTH_LABELS = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Jun",
    "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc",
];

type Props = {

    rows: MemberYearGridRow[];

    onViewHistory(member: SelectedMember): void;

    onRecordPayment(member: SelectedMember): void;

};

export default function ContributionsYearGrid({
    rows,
    onViewHistory,
    onRecordPayment,
}: Props) {

    return (

        <div className="rounded-lg border bg-card overflow-x-auto">

            <table className="w-full text-sm">

                <thead>

                    <tr className="border-b">

                        <th className="text-left p-3 font-semibold">Membre</th>

                        {MONTH_LABELS.map((label) => (

                            <th key={label} className="p-2 text-xs text-muted-foreground font-normal">
                                {label}
                            </th>

                        ))}

                        <th className="p-3 text-right font-semibold">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {rows.map((row) => (

                        <tr key={row.profile.id} className="border-b last:border-0">

                            <td className="p-3 whitespace-nowrap">

                                {row.profile.nom} {row.profile.prenom}

                                <div className="text-xs text-muted-foreground">
                                    {row.profile.member_number}
                                </div>

                            </td>

                            {row.months.map((month, index) => (

                                <td key={index} className="p-2">

                                    {month ? (

                                        <MonthSquares

                                            amountDue={month.amountDue}

                                            amountPaid={month.amountPaid}

                                        />

                                    ) : (

                                        <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-4 h-4 opacity-30">

                                            {Array.from({ length: 4 }).map((_, i) => (

                                                <div

                                                    key={i}

                                                    className="rounded-sm border border-border"

                                                    style={{ width: "7px", height: "7px" }}

                                                />

                                            ))}

                                        </div>

                                    )}

                                </td>

                            ))}

                            <td className="p-3 text-right">

                                <div className="flex justify-end gap-2">

                                    <Button

                                        variant="ghost"

                                        size="icon"

                                        onClick={() => onViewHistory(row.profile)}

                                    >

                                        <Eye className="h-4 w-4" />

                                    </Button>

                                    <Button

                                        variant="ghost"

                                        size="icon"

                                        onClick={() => onRecordPayment(row.profile)}

                                    >

                                        <Wallet className="h-4 w-4" />

                                    </Button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}