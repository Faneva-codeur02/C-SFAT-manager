-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 015
-- Create account_categories
-- =====================================================

CREATE TABLE public.account_categories (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,

    type accounting_entry_type NOT NULL,

    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()

);