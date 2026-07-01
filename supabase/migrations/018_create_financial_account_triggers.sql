-- =====================================================
-- C-SFAT Manager v1.0
-- Migration 018
-- Update financial account balances
-- =====================================================

CREATE OR REPLACE FUNCTION update_financial_account_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

    -- INSERT
    IF TG_OP = 'INSERT' THEN

        UPDATE financial_accounts
        SET current_balance =
            CASE
                WHEN NEW.entry_type = 'income'
                    THEN current_balance + NEW.amount
                ELSE
                    current_balance - NEW.amount
            END
        WHERE id = NEW.financial_account_id;

        RETURN NEW;

    END IF;

    -- DELETE
    IF TG_OP = 'DELETE' THEN

        UPDATE financial_accounts
        SET current_balance =
            CASE
                WHEN OLD.entry_type = 'income'
                    THEN current_balance - OLD.amount
                ELSE
                    current_balance + OLD.amount
            END
        WHERE id = OLD.financial_account_id;

        RETURN OLD;

    END IF;

    -- UPDATE
    IF TG_OP = 'UPDATE' THEN

        -- Annule l'ancienne écriture
        UPDATE financial_accounts
        SET current_balance =
            CASE
                WHEN OLD.entry_type = 'income'
                    THEN current_balance - OLD.amount
                ELSE
                    current_balance + OLD.amount
            END
        WHERE id = OLD.financial_account_id;

        -- Applique la nouvelle
        UPDATE financial_accounts
        SET current_balance =
            CASE
                WHEN NEW.entry_type = 'income'
                    THEN current_balance + NEW.amount
                ELSE
                    current_balance - NEW.amount
            END
        WHERE id = NEW.financial_account_id;

        RETURN NEW;

    END IF;

    RETURN NULL;

END;
$$;