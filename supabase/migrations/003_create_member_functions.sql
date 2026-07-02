//function_is_admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND status = 'active'
);
$$;

//function_is_tresaurer
CREATE OR REPLACE FUNCTION is_treasurer()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
      AND (
            role = 'treasurer'
            OR role = 'admin'
      )
      AND status = 'active'
);
$$;