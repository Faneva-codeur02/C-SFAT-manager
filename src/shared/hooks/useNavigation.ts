import { navigation } from "@/config/navigation";
import { usePermission } from "@/features/auth/hooks/usePermission";
import type { NavigationItem } from "@/types/navigation";


export function useNavigation() {

    const { can } = usePermission();


    function filterItems(
        items: NavigationItem[]
    ): NavigationItem[] {


        return items

            .filter(item => {


                if (item.permission) {

                    return can(
                        item.permission
                    );

                }


                return true;

            })


            .map(item => ({


                ...item,


                children:

                    item.children

                        ?

                        filterItems(
                            item.children
                        )

                        :

                        undefined,


            }))


            .filter(item =>

                !item.children ||

                item.children.length > 0

            );

    }


    return filterItems(
        navigation
    );

}