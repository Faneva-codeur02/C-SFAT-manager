-- ==========================================================
-- APPROVE MEMBER
-- ==========================================================

CREATE OR REPLACE FUNCTION approve_member(
    p_member_id UUID,
    p_role user_role,
    p_voice_part voice_part,
    p_validated_by UUID,
    p_date_entree DATE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_member_number TEXT;
BEGIN

    IF NOT is_admin() THEN
        RAISE EXCEPTION 'Accès refusé.';
    END IF;


    -- Vérifie que le membre existe
    IF NOT EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = p_member_id
    ) THEN
        RAISE EXCEPTION 'Membre introuvable.';
    END IF;

    -- Vérifie que le membre est encore en attente
    IF EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = p_member_id
          AND status <> 'pending'
    ) THEN
        RAISE EXCEPTION 'Ce membre est déjà traité.';
    END IF;

    -- Génération du prochain numéro
    SELECT
        'M' ||
        LPAD(
            (
                COALESCE(
                    MAX(
                        SUBSTRING(member_number FROM 2)::INTEGER
                    ),
                    0
                ) + 1
            )::TEXT,
            4,
            '0'
        )
    INTO v_member_number
    FROM profiles
    WHERE member_number IS NOT NULL;

    UPDATE profiles
    SET
        status = 'active',
        role = p_role,
        voice_part = p_voice_part,
        member_number = v_member_number,
        validated_at = NOW(),
        validated_by = p_validated_by,
        date_entree = p_date_entree,
        updated_at = NOW()
    WHERE id = p_member_id;

END;
$$;