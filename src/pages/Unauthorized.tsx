import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function Unauthorized() {

    const navigate = useNavigate();


    return (

        <div className="
            min-h-screen
            flex
            flex-col
            items-center
            justify-center
            gap-5
        ">

            <h1 className="text-3xl font-bold">
                Accès refusé
            </h1>


            <p className="text-muted-foreground">
                Vous n'avez pas la permission
                d'accéder à cette page.
            </p>


            <Button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Retour Dashboard
            </Button>

        </div>

    );
}