-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 009
-- Create opening_balances
-- =====================================================

CREATE TABLE public.opening_balances (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    profile_id UUID
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    season_id UUID
        REFERENCES seasons(id)
        ON DELETE CASCADE,

    balance_type TEXT NOT NULL,

    amount NUMERIC(12,2) NOT NULL
        CHECK (amount >= 0),

    description TEXT,

    created_by UUID
        REFERENCES profiles(id),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);