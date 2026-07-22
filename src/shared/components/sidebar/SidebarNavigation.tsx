import { useNavigation } from "@/shared/hooks/useNavigation";

import NavItem from "@/shared/components/navigation/NavItem";
import SidebarGroup from "@/shared/components/sidebar/SidebarGroup";

export default function SidebarNavigation() {

    const menu = useNavigation();

    return (

        <nav className="flex-1 overflow-y-auto px-2 py-3">

            {

                menu.map((item) => {

                    if (item.children) {

                        return (

                            <SidebarGroup

                                key={item.title}

                                title={item.title}

                                icon={item.icon}

                                items={item.children}

                            />

                        );

                    }

                    return (

                        <NavItem

                            key={item.url}

                            title={item.title}

                            url={item.url!}

                            icon={item.icon}

                        />

                    );

                })

            }

        </nav>

    );

}