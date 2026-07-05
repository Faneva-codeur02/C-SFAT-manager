-- ==========================================================
-- CONSUME INVITATION CODE
-- ==========================================================

CREATE OR REPLACE FUNCTION consume_invitation_code(
    p_invitation_id UUID,
    p_used_by UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN

    -- Vérifie que le code existe
    IF NOT EXISTS (
        SELECT 1
        FROM invitation_codes
        WHERE id = p_invitation_id
    ) THEN
        RAISE EXCEPTION 'Code introuvable.';
    END IF;

    -- Vérifie qu'il n'a pas déjà été utilisé
    IF EXISTS (
        SELECT 1
        FROM invitation_codes
        WHERE id = p_invitation_id
          AND used = TRUE
    ) THEN
        RAISE EXCEPTION 'Ce code a déjà été utilisé.';
    END IF;

    -- Vérifie qu'il n'est pas expiré
    IF EXISTS (
        SELECT 1
        FROM invitation_codes
        WHERE id = p_invitation_id
          AND expires_at <= NOW()
    ) THEN
        RAISE EXCEPTION 'Ce code est expiré.';
    END IF;

    UPDATE invitation_codes
    SET
        used = TRUE,
        used_by = p_used_by
    WHERE id = p_invitation_id;

END;
$$;

//DROIT D execution
GRANT EXECUTE ON FUNCTION consume_invitation_code(UUID, UUID)
TO anon, authenticated;