-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 016
-- Create accounting_entries
-- =====================================================

CREATE TABLE public.accounting_entries (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    season_id UUID NOT NULL
        REFERENCES seasons(id),

    category_id UUID NOT NULL
        REFERENCES account_categories(id),

    amount NUMERIC(12,2) NOT NULL
        CHECK (amount > 0),

    entry_type accounting_entry_type NOT NULL,

    entry_date DATE NOT NULL,

    description TEXT,

    payment_id UUID
        REFERENCES payments(id),

    created_by UUID
        REFERENCES profiles(id),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);