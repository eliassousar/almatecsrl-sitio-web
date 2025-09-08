-- Fix critical security issue: Add SELECT policies to protect customer contact information
-- Both quote_requests and contact_inquiries tables contain sensitive data but lack SELECT protection

-- Add SELECT policy for quote_requests table
-- Only authenticated users should be able to read quote requests (typically admin users)
CREATE POLICY "Only authenticated users can read quote requests" 
  ON public.quote_requests 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Add SELECT policy for contact_inquiries table  
-- Only authenticated users should be able to read contact inquiries (typically admin users)
CREATE POLICY "Only authenticated users can read contact inquiries" 
  ON public.contact_inquiries 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Note: These policies require authentication to be implemented in the application
-- Without authentication, no one will be able to read the data through the application
-- This is the most secure approach for protecting sensitive customer information