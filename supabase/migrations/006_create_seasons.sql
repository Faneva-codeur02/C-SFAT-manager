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

//Trigger
CREATE TRIGGER trg_seasons_updated_at
BEFORE UPDATE ON seasons
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();


//Index_
CREATE INDEX idx_seasons_current
ON seasons(is_current);

