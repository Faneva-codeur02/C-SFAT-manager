import { Music2 } from "lucide-react";

import { usePublicBranding } from "../hooks/usePublicBranding";

interface Props {

    title: string;

    subtitle?: string;

    children: React.ReactNode;

}

export default function AuthLayout({
    title,
    subtitle,
    children,
}: Props) {

    const branding = usePublicBranding();

    return (

        <div className="flex min-h-screen">

            {/* Panneau de marque — masqué sur mobile */}

            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">

                <div

                    className="absolute inset-0 opacity-20"

                    style={{

                        backgroundImage:

                            "radial-gradient(circle at 20% 30%, white 0%, transparent 45%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)",

                    }}

                />

                <div className="relative flex items-center gap-3">

                    <img

                        src="/logo_csfat.png"

                        alt="Logo"

                        className="h-12 w-12"

                    />

                    <span className="text-lg font-semibold">

                        {branding.choir_name}

                    </span>

                </div>

                <div className="relative space-y-4">

                    <Music2 className="h-10 w-10 opacity-80" />

                    <h2 className="text-3xl font-bold leading-tight">

                        {branding.choir_name}

                    </h2>

                    {branding.church_name && (

                        <p className="text-lg opacity-90">

                            Chorale {branding.church_name}

                        </p>

                    )}

                    <p className="max-w-sm text-sm opacity-75">

                        Gestion des membres, des cotisations et de la comptabilité
                        de la chorale, en un seul endroit.

                    </p>

                </div>

                <p className="relative text-xs opacity-60">

                    © {new Date().getFullYear()} {branding.choir_name}

                </p>

            </div>

            {/* Formulaire */}

            <div className="flex w-full items-center justify-center bg-background px-6 lg:w-1/2">

                <div className="w-full max-w-sm">

                    {/* Logo mobile uniquement */}

                    <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">

                        <img

                            src="/logo_csfat.png"

                            alt="Logo"

                            className="h-10 w-10"

                        />

                        <span className="text-lg font-semibold">

                            {branding.choir_name}

                        </span>

                    </div>

                    <div className="mb-8">

                        <h1 className="text-2xl font-bold">

                            {title}

                        </h1>

                        {subtitle && (

                            <p className="mt-2 text-sm text-muted-foreground">

                                {subtitle}

                            </p>

                        )}

                    </div>

                    {children}

                </div>

            </div>

        </div>

    );

}