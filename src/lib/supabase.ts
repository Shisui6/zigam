import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when server-side Supabase env vars are present. */
export const supabaseConfigured = Boolean(url && serviceKey);

/**
 * Server-only Supabase client using the service-role key.
 * Never import this into client components.
 */
export function getServiceClient(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  return createClient(url as string, serviceKey as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
