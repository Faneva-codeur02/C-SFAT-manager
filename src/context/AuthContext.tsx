import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { supabase } from "@/lib/supabase";

type AuthContextType = {
    user: any;
    loading: boolean;
};

const AuthContext =
    createContext<AuthContextType>({
        user: null,
        loading: true,
    });

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function getSession() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
            setLoading(false);
        }

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () =>
    useContext(AuthContext);