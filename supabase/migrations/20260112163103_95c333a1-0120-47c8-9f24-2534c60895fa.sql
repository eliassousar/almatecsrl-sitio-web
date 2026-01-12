-- Add UPDATE and DELETE policies for admin users on quote_requests
CREATE POLICY "Admins can update quotes"
  ON public.quote_requests
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete quotes"
  ON public.quote_requests
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add UPDATE and DELETE policies for admin users on contact_inquiries
CREATE POLICY "Admins can update contacts"
  ON public.contact_inquiries
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contacts"
  ON public.contact_inquiries
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));