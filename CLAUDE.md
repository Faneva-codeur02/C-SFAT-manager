# CSFAT Manager

## Description

Application web de gestion de la Chorale C-SFAT.

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase
- PostgreSQL

## Fonctionnalités

L'application permet notamment :

- gérer les membres ;
- gérer les rôles ;
- gérer les cotisations ;
- consulter les informations comptables ;
- gérer les utilisateurs ;
- authentifier les utilisateurs avec Supabase.

## Rôles

Les rôles principaux sont :

- admin
- tresorier
- membre

## Règles de développement

- Utiliser TypeScript.
- Ne pas utiliser `any` sauf nécessité absolue.
- Utiliser les composants shadcn/ui existants.
- Utiliser Tailwind CSS.
- Réutiliser les composants existants.
- Ne pas supprimer une fonctionnalité existante sans justification.
- Ne pas modifier les politiques RLS sans analyse préalable.
- Ne pas exposer les clés secrètes Supabase.