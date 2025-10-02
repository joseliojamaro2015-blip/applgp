'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

export default function Dashboard() {
  const [session, setSession] = useState<any>();
  const [sub, setSub] = useState<any>();
  const [plan, setPlan] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: s } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      setSub(s);
      if (s?.plan_id) {
        const { data: p } = await supabase
          .from('plans')
          .select('*')
          .eq('id', s.plan_id)
          .maybeSingle();
        setPlan(p);
      }
    })();
  }, [session?.user?.id]);

  async function pay() {
    setError(undefined);
    const res = await fetch('/api/payments/checkout?subscription_id=' + sub?.id);
    const j = await res.json();
    if (res.ok && (j.init_point || j.sandbox_init_point)) {
      location.href = j.init_point || j.sandbox_init_point;
    } else {
      setError(j.error || 'Erro');
    }
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Área do Membro</h1>

      {!session && (
        <p>
          Você não está logado. <a className="underline" href="/login">Entrar</a>
        </p>
      )}

      {session && (
        <div className="card">
          <div className="flex items-center gap-2">
            <strong>Seu plano</strong>
            {sub?.status && <span className="badge">{sub.status}</span>}
          </div>

          <div className="text-slate-600 mt-1">
            {plan ? (
              <span>
                {plan.name} — R$ {(plan.price_cents / 100).toFixed(2)}
              </span>
            ) : (
              'Nenhum plano'
            )}
          </div>

          {sub?.status !== 'active' && sub?.id && (
            <div className="mt-2">
              <button className="btn btn-primary" onClick={pay}>
                Realizar Pagamento
              </button>
              <p className="text-xs">
                Após o pagamento, o acesso é liberado.
              </p>
            </div>
          )}

          {sub?.status === 'active' && (
            <div className="text-sm text-green-700 mt-2">
              Pagamento confirmado.
            </div>
          )}

          {error && <div className="text-sm text-red-700 mt-2">{error}</div>}

          {sub?.status === 'active' && (
            <div className="mt-2">
              <a className="underline" href="/wallet">Abrir carteirinha</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
