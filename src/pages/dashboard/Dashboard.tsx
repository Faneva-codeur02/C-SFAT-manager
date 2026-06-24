import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
    useEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            console.log(user);
        }

        getUser();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>
        </div>
    );
}