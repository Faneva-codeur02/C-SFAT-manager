-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 005
-- Create invitation_codes
-- =====================================================

CREATE TABLE public.invitation_codes (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code TEXT NOT NULL UNIQUE,

    created_by UUID
        REFERENCES profiles(id),

    used_by UUID
        REFERENCES profiles(id),

    expires_at TIMESTAMPTZ NOT NULL,

    used BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

//index_
CREATE INDEX idx_invitation_code
ON invitation_codes(code);

CREATE INDEX idx_invitation_used
ON invitation_codes(used);

CREATE INDEX idx_invitation_expires
ON invitation_codes(expires_at);


