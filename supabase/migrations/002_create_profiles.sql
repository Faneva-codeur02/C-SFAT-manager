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


-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX idx_profiles_nom
ON profiles(nom);

CREATE INDEX idx_profiles_prenom
ON profiles(prenom);

CREATE INDEX idx_profiles_status
ON profiles(status);

CREATE INDEX idx_profiles_role
ON profiles(role);

CREATE INDEX idx_profiles_voice_part
ON profiles(voice_part);

CREATE INDEX idx_profiles_email
ON profiles(email);


-- =====================================================
-- Function : update_updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();


//POLICY8ADMIN
CREATE POLICY "Admins can read all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
    is_admin()
);

//POLICY_EDITMEMBER
CREATE POLICY "Admins can update all profiles"

ON profiles

FOR UPDATE

USING (
    is_admin()
)

WITH CHECK (
    is_admin()
);