-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 010
-- Create payments table
-- =====================================================

CREATE TABLE public.payments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    member_contribution_id UUID NOT NULL
        REFERENCES member_contributions(id)
        ON DELETE CASCADE,

    amount NUMERIC(12,2) NOT NULL
        CHECK (amount > 0),

    payment_date TIMESTAMPTZ NOT NULL
        DEFAULT now(),

    payment_method TEXT NOT NULL,

    reference TEXT,

    note TEXT,

    received_by UUID
        REFERENCES profiles(id),

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL
        DEFAULT now()

);