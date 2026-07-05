-- ==========================================================
-- VALIDATE INVITATION CODE
-- ==========================================================

CREATE OR REPLACE FUNCTION validate_invitation_code(
    p_code TEXT
)
RETURNS TABLE (
    id UUID,
    code TEXT,
    expires_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN

    RETURN QUERY

    SELECT
        ic.id,
        ic.code,
        ic.expires_at
    FROM invitation_codes ic
    WHERE
        UPPER(ic.code) = UPPER(TRIM(p_code))
        AND ic.used = FALSE
        AND ic.expires_at > NOW();

END;
$$;




GRANT EXECUTE ON FUNCTION validate_invitation_code(TEXT)
TO anon, authenticated;