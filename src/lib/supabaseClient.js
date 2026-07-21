import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config'

// Used only for the distributor registration payment flow (email magic-link sign-in).
// Nothing else on the site touches Supabase Auth — browsing and checkout stay account-free.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
