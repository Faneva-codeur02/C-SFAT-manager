-- =====================================================
-- Migration 025
-- RLS invitation_codes
-- =====================================================

ALTER TABLE public.invitation_codes
ENABLE ROW LEVEL SECURITY;

--------------------------------------------------------
-- Lecture
--------------------------------------------------------

CREATE POLICY invitation_codes_select
ON public.invitation_codes
FOR SELECT
USING (
    is_admin()
);

--------------------------------------------------------
-- Création
--------------------------------------------------------

CREATE POLICY invitation_codes_insert
ON public.invitation_codes
FOR INSERT
WITH CHECK (
    is_admin()
);

--------------------------------------------------------
-- Modification
--------------------------------------------------------

CREATE POLICY invitation_codes_update
ON public.invitation_codes
FOR UPDATE
USING (
    is_admin()
)
WITH CHECK (
    is_admin()
);

--------------------------------------------------------
-- Suppression
--------------------------------------------------------

CREATE POLICY invitation_codes_delete
ON public.invitation_codes
FOR DELETE
USING (
    is_admin()
);