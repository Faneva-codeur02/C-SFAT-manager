-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 004
-- Create settings table
-- =====================================================

CREATE TABLE public.settings (

    key TEXT PRIMARY KEY,

    value TEXT NOT NULL,

    description TEXT,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);