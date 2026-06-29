import { useLocation } from "react-router-dom";

export function usePageTitle() {

    const { pathname } = useLocation();

    switch (pathname) {

        case "/dashboard":
            return "Dashboard";

        case "/members":
            return "Membres";

        case "/invitations":
            return "Invitations";

        case "/accounting":
            return "Comptabilité";

        case "/contributions":
            return "Cotisations";

        default:
            return "C-SFAT Manager";

    }

}