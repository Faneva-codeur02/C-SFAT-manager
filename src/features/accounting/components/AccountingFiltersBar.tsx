import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import { useAccountCategories } from "../hooks/useAccountCategories";
import { useFinancialAccounts } from "../hooks/useFinancialAccounts";

type Props = {

    entryType?: "income" | "expense";

    categoryId?: string;

    financialAccountId?: string;

    onEntryTypeChange(value: "income" | "expense" | undefined): void;

    onCategoryChange(value: string | undefined): void;

    onAccountChange(value: string | undefined): void;

};

export default function AccountingFiltersBar({
    entryType,
    categoryId,
    financialAccountId,
    onEntryTypeChange,
    onCategoryChange,
    onAccountChange,
}: Props) {

    const { categories } = useAccountCategories();

    const { accounts } = useFinancialAccounts();

    const typeItems = [

        { value: "all", label: "Tous les types" },

        { value: "income", label: "Recettes" },

        { value: "expense", label: "Dépenses" },

    ];

    const categoryItems = [

        { value: "all", label: "Toutes les catégories" },

        ...categories.map((c) => ({ value: c.id, label: c.name })),

    ];

    const accountItems = [

        { value: "all", label: "Tous les comptes" },

        ...accounts.map((a) => ({ value: a.id, label: a.name })),

    ];

    function handleTypeChange(value: string | null) {

        if (value === null || value === "all") {

            onEntryTypeChange(undefined);

            return;

        }

        onEntryTypeChange(value as "income" | "expense");

    }

    function handleCategoryChange(value: string | null) {

        onCategoryChange(value === null || value === "all" ? undefined : value);

    }

    function handleAccountChange(value: string | null) {

        onAccountChange(value === null || value === "all" ? undefined : value);

    }

    return (

        <div className="flex gap-3 mb-4">

            <Select

                items={typeItems}

                value={entryType ?? "all"}

                onValueChange={handleTypeChange}

            >

                <SelectTrigger className="w-40">

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    {typeItems.map((item) => (

                        <SelectItem key={item.value} value={item.value}>

                            {item.label}

                        </SelectItem>

                    ))}

                </SelectContent>

            </Select>

            <Select

                items={categoryItems}

                value={categoryId ?? "all"}

                onValueChange={handleCategoryChange}

            >

                <SelectTrigger className="w-52">

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    {categoryItems.map((item) => (

                        <SelectItem key={item.value} value={item.value}>

                            {item.label}

                        </SelectItem>

                    ))}

                </SelectContent>

            </Select>

            <Select

                items={accountItems}

                value={financialAccountId ?? "all"}

                onValueChange={handleAccountChange}

            >

                <SelectTrigger className="w-52">

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    {accountItems.map((item) => (

                        <SelectItem key={item.value} value={item.value}>

                            {item.label}

                        </SelectItem>

                    ))}

                </SelectContent>

            </Select>

        </div>

    );

}