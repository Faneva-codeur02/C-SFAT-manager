-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 008
-- Create member_contributions
-- =====================================================

CREATE TABLE public.member_contributions (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    contribution_period_id UUID NOT NULL
        REFERENCES contribution_periods(id)
        ON DELETE CASCADE,

    amount_due NUMERIC(10,2) NOT NULL CHECK (amount_due >= 0),

    amount_paid NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),

    status payment_status NOT NULL DEFAULT 'pending',

    paid_at TIMESTAMPTZ,

    note TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_member_period
        UNIQUE(profile_id, contribution_period_id)

);