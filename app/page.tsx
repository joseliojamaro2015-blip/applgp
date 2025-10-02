'use client';
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase-client';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      if (data.session) router.replace('/dashboard');
      else router.replace('/login');
    })();
  }, [router]);

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <p className="text-sm text-slate-500">Carregando…</p>
    </div>
  );
}
