-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 006
-- Create seasons table
-- =====================================================

CREATE TABLE public.seasons (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    is_current BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT chk_dates
    CHECK (start_date < end_date)

);