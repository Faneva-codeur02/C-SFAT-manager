import {
    Bell,
    Search,
} from "lucide-react";

import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useSearch } from "@/shared/context/SearchContext";


export default function Header() {
    const title = usePageTitle();

    const {
        search,
        setSearch,
    } = useSearch();

    return (

        <header className="flex h-16 items-center justify-between border-b bg-background px-6">

            <div className="flex items-center gap-6">

                <h1 className="text-xl font-bold">

                    {title}

                </h1>

                <div className="relative">

                    <Search
                        className="absolute left-3 top-3"
                        size={16}
                    />

                    <Input
                        className="w-80 pl-10"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            <div className="flex items-center gap-3">

                <ThemeToggle />

                <Button
                    variant="ghost"
                    size="icon"
                >

                    <Bell size={18} />

                </Button>

                <UserMenu />

            </div>

        </header>

    );

}