'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const supabase = getSupabase(); // chama aqui, não no topo do módulo
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  // ... resto inalterado; sempre que precisar, chame getSupabase() dentro do escopo
}
