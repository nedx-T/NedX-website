-- Create admin_invitations table for secure invitation tokens
CREATE TABLE public.admin_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_invitations ENABLE ROW LEVEL SECURITY;

-- Only admins can view invitations
CREATE POLICY "Admins can view invitations"
ON public.admin_invitations
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can create invitations
CREATE POLICY "Admins can create invitations"
ON public.admin_invitations
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update invitations (mark as used)
CREATE POLICY "Admins can update invitations"
ON public.admin_invitations
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for token lookups
CREATE INDEX idx_admin_invitations_token ON public.admin_invitations(token);

-- Create index for email lookups
CREATE INDEX idx_admin_invitations_email ON public.admin_invitations(email);