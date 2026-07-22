import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

interface SidebarContextType {
    collapsed: boolean;

    setCollapsed: (value: boolean) => void;

    toggle: () => void;

    open: () => void;

    close: () => void;

    mobileOpen: boolean;

    setMobileOpen: (value: boolean) => void;

    toggleMobile: () => void;
}

export const SidebarContext =
    createContext<SidebarContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function SidebarProvider({
    children,
}: Props) {

    // Desktop
    const [collapsed, setCollapsed] = useState(() => {

        const saved = localStorage.getItem("sidebar");

        return saved === "collapsed";

    });

    // Mobile
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {

        localStorage.setItem(
            "sidebar",
            collapsed
                ? "collapsed"
                : "expanded"
        );

    }, [collapsed]);

    function toggle() {

        setCollapsed(prev => !prev);

    }

    function open() {

        setCollapsed(false);

    }

    function close() {

        setCollapsed(true);

    }

    function toggleMobile() {

        setMobileOpen(prev => !prev);

    }

    return (

        <SidebarContext.Provider

            value={{

                collapsed,

                setCollapsed,

                toggle,

                open,

                close,

                mobileOpen,

                setMobileOpen,

                toggleMobile,

            }}

        >

            {children}

        </SidebarContext.Provider>

    );

}