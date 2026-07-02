-- =====================================================
-- Enable RLS
-- =====================================================

ALTER TABLE public.profiles
ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Chaque utilisateur peut lire son profil
-- =====================================================

CREATE POLICY "Users can read own profile"

ON public.profiles

FOR SELECT

USING (
    auth.uid() = id
);

-- =====================================================
-- Chaque utilisateur peut modifier son profil
-- =====================================================

CREATE POLICY "Users can update own profile"

ON public.profiles

FOR UPDATE

USING (
    auth.uid() = id
);

-- =====================================================
-- Création du profil lors de l'inscription
-- =====================================================

CREATE POLICY "Users can insert own profile"

ON public.profiles

FOR INSERT

WITH CHECK (
    auth.uid() = id
);