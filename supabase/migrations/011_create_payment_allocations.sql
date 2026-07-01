CREATE TABLE public.payment_allocations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    payment_id UUID NOT NULL
        REFERENCES payments(id)
        ON DELETE CASCADE,

    member_contribution_id UUID NOT NULL
        REFERENCES member_contributions(id)
        ON DELETE CASCADE,

    allocated_amount NUMERIC(12,2) NOT NULL
        CHECK (allocated_amount > 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_payment_contribution
        UNIQUE(payment_id, member_contribution_id)

);