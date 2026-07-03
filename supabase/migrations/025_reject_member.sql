-- ==========================================================
-- REJECT MEMBER
-- ==========================================================

CREATE OR REPLACE FUNCTION reject_member(
    p_member_id UUID,
    p_validated_by UUID
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN

    -- Vérifie que le membre existe
    IF NOT EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = p_member_id
    ) THEN
        RAISE EXCEPTION 'Membre introuvable.';
    END IF;

    -- Vérifie qu'il est encore en attente
    IF EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = p_member_id
          AND status <> 'pending'
    ) THEN
        RAISE EXCEPTION 'Ce membre a déjà été traité.';
    END IF;

    UPDATE profiles
    SET
        status = 'rejected',
        validated_by = p_validated_by,
        validated_at = NOW(),
        updated_at = NOW()
    WHERE id = p_member_id;

END;
$$;