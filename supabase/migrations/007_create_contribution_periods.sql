-- =====================================================
-- Create contribution periods
-- =====================================================

CREATE TABLE public.contribution_periods (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    season_id UUID NOT NULL
        REFERENCES seasons(id)
        ON DELETE CASCADE,

    week_number INTEGER NOT NULL,

    amount NUMERIC(10,2) NOT NULL,

    due_date DATE NOT NULL,

    created_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT unique_week
    UNIQUE (

        season_id,

        week_number

    )

);