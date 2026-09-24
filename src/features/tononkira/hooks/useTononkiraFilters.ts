import { useSearch } from "@/shared/context/SearchContext";

export function useTononkiraFilters() {

    const { search } = useSearch();

    return { search };

}