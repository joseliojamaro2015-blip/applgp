'use client';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabase() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // Durante o build/SSR, não quebre ao importar o módulo
    if (typeof window === 'undefined') {
      // retorna um proxy que só lança se alguém tentar usar no servidor
      return new Proxy({} as SupabaseClient, {
        get() {
          throw new Error('Supabase: variáveis de ambiente faltando no servidor/build');
        },
      }) as SupabaseClient;
    }
    // No browser, avise claramente
    throw new Error('Supabase: variáveis de ambiente faltando');
  }

  client = createClient(url, anon, { auth: { persistSession: true } });
  return client;
}
