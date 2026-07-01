-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 002
-- Create profiles table
-- =====================================================

CREATE TABLE public.profiles (

    -- Same id as auth.users
    id UUID PRIMARY KEY
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    -- Generated later by trigger
    member_number TEXT UNIQUE,

    email TEXT NOT NULL UNIQUE,

    nom TEXT NOT NULL,

    prenom TEXT NOT NULL,

    gender gender_type,

    telephone TEXT,

    adresse TEXT,

    profession TEXT,

    date_naissance DATE,

    date_entree DATE,

    photo_url TEXT,

    voice_part voice_part,

    role user_role NOT NULL
        DEFAULT 'member',

    status member_status NOT NULL
        DEFAULT 'pending',

    validated_by UUID
        REFERENCES profiles(id),

    validated_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT now()
);