'use client';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function createStubClient(): SupabaseClient {
  const anyStub: any = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithOtp: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } }),
    },
    from() {
      const q: any = {
        select: async () => ({ data: [], error: { message: 'Configuração do Supabase ausente' } }),
        insert: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } }),
        update: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } }),
        delete: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } }),
        eq() { return q; },
        order() { return q; },
        limit() { return q; },
        maybeSingle: async () => ({ data: null, error: { message: 'Configuração do Supabase ausente' } }),
      };
      return q;
    },
  };
  return anyStub as SupabaseClient;
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
    client = createStubClient();
    return client;
  }
  client = createClient(url, anon, { auth: { persistSession: true } });
  return client;
}

// Compat: permite importar { supabase } em código antigo
const handler: ProxyHandler<SupabaseClient> = {
  get(_target, prop, receiver) {
    const real = getSupabase() as any;
    return Reflect.get(real, prop, receiver);
  },
};

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, handler);
