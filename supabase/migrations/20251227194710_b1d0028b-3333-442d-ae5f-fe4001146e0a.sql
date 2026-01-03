-- Drop the overly permissive service role policy that applies to public
DROP POLICY IF EXISTS "Allow service role full access" ON public.bookings;

-- Create a proper service role policy using the service_role role
-- Note: Service role bypasses RLS by default, so this policy is mainly for documentation
-- The key fix is removing the public-facing "ALL" policy