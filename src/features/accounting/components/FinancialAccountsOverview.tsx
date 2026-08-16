import { Wallet, Landmark, Smartphone } from "lucide-react";
import type { FinancialAccount } from "../types/accounting.types";

function formatAmount(amount: number): string {

    return `${amount.toLocaleString("fr-FR")} Ar`;

}

function AccountIcon({ type }: { type: FinancialAccount["account_type"] }) {

    if (type === "cash") return <Wallet className="h-5 w-5" />;

    if (type === "bank") return <Landmark className="h-5 w-5" />;

    return <Smartphone className="h-5 w-5" />;

}

type Props = {

    accounts: FinancialAccount[];

    loading: boolean;

};

export default function FinancialAccountsOverview({ accounts, loading }: Props) {

    const total = accounts.reduce((sum, a) => sum + a.current_balance, 0);

    if (loading) {

        return <p className="text-muted-foreground">Chargement...</p>;

    }

    return (

        <div className="mb-6">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">

                {accounts.map((account) => (

                    <div

                        key={account.id}

                        className="rounded-lg border bg-card p-4"

                    >

                        <div className="flex items-center gap-2 text-muted-foreground mb-2">

                            <AccountIcon type={account.account_type} />

                            <span className="text-sm">{account.name}</span>

                        </div>

                        <div className="text-xl font-semibold">

                            {formatAmount(account.current_balance)}

                        </div>

                    </div>

                ))}

            </div>

            <div className="rounded-lg border bg-muted/40 p-4">

                <span className="text-sm text-muted-foreground mr-2">

                    Total tous comptes

                </span>

                <span className="text-lg font-bold">

                    {formatAmount(total)}

                </span>

            </div>

        </div>

    );

}