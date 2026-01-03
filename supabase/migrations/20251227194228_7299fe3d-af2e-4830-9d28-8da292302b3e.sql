-- Drop the existing restrictive SELECT policy
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;

-- Create a PERMISSIVE SELECT policy that only allows admins
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));