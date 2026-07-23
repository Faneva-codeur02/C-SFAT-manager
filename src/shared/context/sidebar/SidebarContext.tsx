import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

interface SidebarContextType {

    // Responsive
    isMobile: boolean;

    // Desktop
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;

    toggle: () => void;
    open: () => void;
    close: () => void;

    // Mobile
    mobileOpen: boolean;
    setMobileOpen: (value: boolean) => void;

    toggleMobile: () => void;

}

export const SidebarContext =
    createContext<SidebarContextType | null>(null);

interface Props {
    children: ReactNode;
}

const MOBILE_BREAKPOINT = 768;

export function SidebarProvider({
    children,
}: Props) {

    // ==========================
    // Responsive
    // ==========================

    const [isMobile, setIsMobile] = useState(

        window.innerWidth < MOBILE_BREAKPOINT

    );

    useEffect(() => {

        const onResize = () =>

            setIsMobile(

                window.innerWidth < MOBILE_BREAKPOINT

            );

        window.addEventListener(

            "resize",

            onResize

        );

        return () =>

            window.removeEventListener(

                "resize",

                onResize

            );

    }, []);

    // ==========================
    // Desktop Sidebar
    // ==========================

    const [collapsed, setCollapsed] = useState(() => {

        const saved = localStorage.getItem("sidebar");

        return saved === "collapsed";

    });

    useEffect(() => {

        localStorage.setItem(

            "sidebar",

            collapsed

                ? "collapsed"

                : "expanded"

        );

    }, [collapsed]);

    // ==========================
    // Mobile Sidebar
    // ==========================

    const [mobileOpen, setMobileOpen] = useState(false);

    // Si on passe en desktop,
    // on ferme automatiquement le drawer mobile.

    useEffect(() => {

        if (!isMobile) {

            setMobileOpen(false);

        }

    }, [isMobile]);

    // ==========================
    // Actions
    // ==========================

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

                isMobile,

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