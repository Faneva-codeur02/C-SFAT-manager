-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 019
-- Automatic accounting entries
-- =====================================================

CREATE OR REPLACE FUNCTION create_accounting_entry_from_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE

    contribution_category UUID;

    current_season UUID;

BEGIN

    -- Catégorie "Cotisations"

    SELECT id

    INTO contribution_category

    FROM account_categories

    WHERE name = 'Cotisations'

    LIMIT 1;

    -- Saison active

    SELECT id

    INTO current_season

    FROM seasons

    WHERE is_active = TRUE

    LIMIT 1;

    INSERT INTO accounting_entries (

        season_id,

        category_id,

        financial_account_id,

        amount,

        entry_type,

        entry_date,

        description,

        payment_id,

        created_by

    )

    VALUES (

        current_season,

        contribution_category,

        NEW.financial_account_id,

        NEW.amount,

        'income',

        NEW.payment_date,

        'Paiement de cotisation',

        NEW.id,

        NEW.received_by

    );

    RETURN NEW;

END;
$$;