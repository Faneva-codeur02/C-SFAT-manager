import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import { ProfileService } from "@/services/profile/profile.service";
import type { Profile } from "@/types";

type AuthContextType = {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
};

const AuthContext =
    createContext<AuthContextType>({

        user: null,

        profile: null,

        loading: true,

    });

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] =
        useState<User | null>(null);

    const [profile, setProfile] =
        useState<Profile | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function getSession() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);

            if (user) {

                const profile =
                    await ProfileService.getById(user.id);

                setProfile(profile);

            }
            setLoading(false);
        }

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            async (_, session) => {
                const authUser = session?.user ?? null;

                setUser(authUser);

                if (authUser) {

                    const profile =
                        await ProfileService.getById(authUser.id);

                    setProfile(profile);

                } else {

                    setProfile(null);

                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);



    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () =>
    useContext(AuthContext);