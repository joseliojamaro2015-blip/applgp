'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const supabase = getSupabase();
      const { data: orgs } = await supabase.from('orgs').select('*').order('name');
      const { data: units } = await supabase.from('units').select('*').order('name');
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      setOrgs(orgs || []);
      setUnits(units || []);
      setUsers(profiles || []);
    })();
  }, []);

  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-semibold">Admin — Painel</h1>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="card">
          <h3>Filiais</h3>
          <ul>{orgs.map((o) => (<li key={o.id}>{o.name}</li>))}</ul>
        </div>
        <div className="card">
          <h3>Unidades</h3>
          <ul>{units.map((u) => (<li key={u.id}>{u.name}</li>))}</ul>
        </div>
        <div className="card">
          <h3>Usuários</h3>
          <ul>
            {users.map((u) => (
              <li key={u.user_id}>
                <b>{u.email || u.user_id.slice(0, 6)}</b> — {u.approved ? 'aprovado' : 'pendente'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
