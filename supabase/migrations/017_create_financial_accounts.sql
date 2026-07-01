-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 017
-- Create financial_account_type ENUM
-- =====================================================

CREATE TYPE financial_account_type AS ENUM (

    'cash',

    'bank',

    'mobile_money'

);

-- =====================================================
-- Create financial_accounts
-- =====================================================

CREATE TABLE public.financial_accounts (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,

    account_type financial_account_type NOT NULL,

    current_balance NUMERIC(12,2)
        NOT NULL DEFAULT 0
        CHECK(current_balance >= 0),

    description TEXT,

    is_active BOOLEAN
        NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ
        NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ
        NOT NULL DEFAULT now()

);