-- ==========================================================
-- REJECT MEMBER
-- ==========================================================

CREATE OR REPLACE FUNCTION reject_member(
    p_member_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = p_member_id
    ) THEN
        RAISE EXCEPTION 'Membre introuvable.';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = p_member_id
          AND status <> 'pending'
    ) THEN
        RAISE EXCEPTION 'Ce membre est déjà traité.';
    END IF;

    UPDATE profiles
    SET
        status = 'rejected',
        updated_at = NOW()
    WHERE id = p_member_id;

END;
$$;