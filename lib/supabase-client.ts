'use client';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function createStubClient(): SupabaseClient {
  // Client "fake" que não quebra a UI se as ENVs faltarem
  const stub = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithOtp: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } as any }),
    },
    from() {
      return {
        select: async () => ({ data: [], error: { message: 'Configuração do Supabase ausente' } as any }),
        insert: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } as any }),
        update: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } as any }),
        delete: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } as any }),
        eq() { return this; },
        order() { return this; },
        limit() { return this; },
        maybeSingle: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } as any }),
      };
    },
  } as unknown as SupabaseClient;
  return stub;
}

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    if (typeof window !== 'undefined') {
      console.error('Supabase: variáveis de ambiente ausentes no cliente.');
    }
    // retorna stub (não lança exception)
    client = createStubClient();
    return client;
  }

  client = createClient(url, anon, { auth: { persistSession: true } });
  return client;
}

/**
 * Compatibilidade: alguns arquivos antigos importam:
 *   import { supabase } from '@/lib/supabase-client'
 * Este export delega dinamicamente para getSupabase().
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const real = getSupabase();
    // @ts-expect-error delegação dinâmica
    return real[prop];
  },
});
