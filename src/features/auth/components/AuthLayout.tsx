import { Users, CalendarDays, Wallet, HeartHandshake } from "lucide-react";

import ThemeToggle from "@/app/layouts/ThemeToggle";

import { usePublicBranding } from "../hooks/usePublicBranding";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface Props {

    title: string;

    subtitle?: string;

    children: React.ReactNode;

}

const features = [

    {

        icon: Users,

        title: "Membres",

        description: "Gestion des membres et des rôles",

    },

    {

        icon: CalendarDays,

        title: "Évènements",

        description: "Organisation et suivi des activités",

    },

    {

        icon: Wallet,

        title: "Comptabilité",

        description: "Suivi des recettes et dépenses",

    },

    {

        icon: HeartHandshake,

        title: "Cotisations",

        description: "Suivi et historique des cotisations",

    },

];

export default function AuthLayout({
    title,
    subtitle,
    children,
}: Props) {

    const { branding, loading } = usePublicBranding();

    return (

        <div className="flex min-h-screen">

            {/* Panneau de marque — masqué sur mobile */}

            <div

                className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-cover bg-center p-12 text-white lg:flex"

                style={{ backgroundImage: "url('/photo_csfat.jpg')" }}

            >

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

                <div className="relative flex items-center gap-3">

                    <img

                        src="/logo_csfat.png"

                        alt="Logo"

                        className="h-12 w-12"

                    />

                    {loading ? (

                        <div className="space-y-1.5">

                            <Skeleton className="h-5 w-32 bg-white/20" />

                            <Skeleton className="h-3.5 w-44 bg-white/10" />

                        </div>

                    ) : (

                        <div>

                            <span className="block text-lg font-semibold">

                                {branding.choir_name}

                            </span>

                            {branding.church_name && (

                                <span className="block text-sm text-white/80">

                                    Chorale {branding.church_name}

                                </span>

                            )}

                        </div>

                    )}

                </div>

                <div className="relative space-y-6">

                    <div>

                        {loading ? (

                            <div className="space-y-2">

                                <Skeleton className="h-9 w-64 bg-white/20" />

                                <Skeleton className="h-9 w-48 bg-white/20" />

                            </div>

                        ) : (

                            <h2 className="text-3xl font-bold leading-tight">

                                Bienvenue sur

                                <span className="block text-primary">

                                    {branding.choir_name} Manager

                                </span>

                            </h2>

                        )}

                        <p className="mt-3 max-w-sm text-sm text-white/80">

                            Gérez facilement la comptabilité et les évènements de
                            notre chorale. Une communauté unie, une même mission :
                            chanter et servir.

                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        {features.map((feature) => {

                            const Icon = feature.icon;

                            return (

                                <div key={feature.title} className="flex items-start gap-2.5">

                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">

                                        <Icon className="h-4 w-4" />

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium">

                                            {feature.title}

                                        </p>

                                        <p className="text-xs text-white/70">

                                            {feature.description}

                                        </p>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                    <blockquote className="border-l-2 border-primary pl-4 italic text-white/85">

                        « Chanter, c'est prier deux fois »

                        <footer className="mt-1 text-xs not-italic uppercase tracking-wide text-white/60">

                            Saint Augustin

                        </footer>

                    </blockquote>

                </div>

                {loading ? (

                    <Skeleton className="h-3 w-24 bg-white/10" />

                ) : (

                    <p className="relative text-xs text-white/60">

                        © {new Date().getFullYear()} {branding.choir_name}

                    </p>

                )}

            </div>

            {/* Formulaire */}

            <div className="relative flex min-h-screen w-full items-center justify-center bg-background px-6 lg:w-1/2">

                <div className="absolute right-6 top-6">

                    <ThemeToggle />

                </div>

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