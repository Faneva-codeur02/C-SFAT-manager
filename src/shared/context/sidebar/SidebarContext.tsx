import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

interface SidebarContextType {

    collapsed: boolean;

    toggle(): void;

    open(): void;

    close(): void;

}

export const SidebarContext =
    createContext<SidebarContextType | null>(null);

interface Props {

    children: ReactNode;

}

export function SidebarProvider({
    children,
}: Props) {

    const [collapsed, setCollapsed] =
        useState(false);

    useEffect(() => {

        const saved =
            localStorage.getItem(
                "sidebar-collapsed"
            );

        if (saved !== null) {

            setCollapsed(saved === "true");

        }

    }, []);

    useEffect(() => {

        localStorage.setItem(

            "sidebar-collapsed",

            String(collapsed)

        );

    }, [collapsed]);

    function toggle() {

        setCollapsed(value => !value);

    }

    function open() {

        setCollapsed(false);

    }

    function close() {

        setCollapsed(true);

    }

    return (

        <SidebarContext.Provider

            value={{

                collapsed,

                toggle,

                open,

                close,

            }}

        >

            {children}

        </SidebarContext.Provider>

    );

}