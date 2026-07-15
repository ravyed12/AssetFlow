-- ============================================================
-- Auto-create a profiles row whenever a new auth user signs up.
-- This runs as a privileged DB trigger so it bypasses RLS.
-- Run once in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role, active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'EMPLOYEE',
    true
  )
  ON CONFLICT (id) DO UPDATE
    SET
      full_name = EXCLUDED.full_name,
      email     = EXCLUDED.email,
      updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop trigger if it already exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
