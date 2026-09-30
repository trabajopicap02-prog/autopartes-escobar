import { createClient } from "@supabase/supabase-js";

// Cliente público de solo lectura (usa la anon key) para las páginas
// del catálogo que no requieren sesión de usuario.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
