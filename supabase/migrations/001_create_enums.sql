-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 001
-- Create ENUM types
-- =====================================================

-------------------------
-- User roles
-------------------------

CREATE TYPE user_role AS ENUM (
    'admin',
    'treasurer',
    'member'
);

-------------------------
-- Member status
-------------------------

CREATE TYPE member_status AS ENUM (
    'pending',
    'active',
    'inactive',
    'rejected'
);

-------------------------
-- Voice part
-------------------------

CREATE TYPE voice_part AS ENUM (
    'soprano',
    'alto',
    'tenor',
    'bass'
);

-------------------------
-- Gender
-------------------------

CREATE TYPE gender_type AS ENUM (
    'male',
    'female'
);

-------------------------
-- Payment status
-------------------------

CREATE TYPE payment_status AS ENUM (
    'pending',
    'partial',
    'paid',
    'cancelled'
);

-------------------------
-- Accounting entry type
-------------------------

CREATE TYPE accounting_entry_type AS ENUM (
    'income',
    'expense'
);

-------------------------
-- Event status
-------------------------

CREATE TYPE event_status AS ENUM (
    'draft',
    'published',
    'finished',
    'cancelled'
);