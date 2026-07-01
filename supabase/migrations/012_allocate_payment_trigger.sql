CREATE OR REPLACE FUNCTION allocate_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE

    remaining_amount NUMERIC(12,2);

    contribution RECORD;

    allocation NUMERIC(12,2);

BEGIN

    remaining_amount := NEW.amount;

    FOR contribution IN

        SELECT
            mc.id,
            mc.amount_due,
            mc.amount_paid

        FROM member_contributions mc

        JOIN contribution_periods cp
        ON cp.id = mc.contribution_period_id

        WHERE mc.profile_id = NEW.profile_id

        AND mc.status <> 'paid'

        ORDER BY cp.period_start ASC

    LOOP

        EXIT WHEN remaining_amount <= 0;

        allocation := LEAST(

            remaining_amount,

            contribution.amount_due - contribution.amount_paid

        );

        INSERT INTO payment_allocations (

            payment_id,

            member_contribution_id,

            allocated_amount

        )

        VALUES (

            NEW.id,

            contribution.id,

            allocation

        );

        UPDATE member_contributions

        SET

            amount_paid = amount_paid + allocation,

            status = CASE

                WHEN amount_paid + allocation >= amount_due
                    THEN 'paid'

                WHEN amount_paid + allocation = 0
                    THEN 'pending'

                ELSE 'partial'

            END,

            paid_at = CASE

                WHEN amount_paid + allocation >= amount_due
                    THEN now()

                ELSE paid_at

            END

        WHERE id = contribution.id;

        remaining_amount :=
            remaining_amount - allocation;

    END LOOP;

    RETURN NEW;

END;
$$;