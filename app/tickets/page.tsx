'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  async function load() {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('tickets')
      .select('*, messages:ticket_messages(*)')
      .order('created_at', { ascending: false });
    setTickets(data || []);
  }
  useEffect(() => { load(); }, []);

  async function openTicket(e: any) {
    e.preventDefault();
    const supabase = getSupabase();
    await supabase.from('tickets').insert({ subject, body, status: 'open' });
    setSubject('');
    setBody('');
    load();
  }

  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-semibold">Tickets</h1>

      <form onSubmit={openTicket} className="card grid gap-2">
        <input
          className="border rounded px-3 py-2"
          placeholder="Assunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="border rounded px-3 py-2"
          rows={3}
          placeholder="Descreva o problema"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="btn btn-primary">Abrir ticket</button>
      </form>

      <div className="grid gap-2">
        {tickets.map((t) => (
          <div key={t.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <strong>#{t.id}</strong> — {t.subject}
              </div>
              <span className="badge">{t.status}</span>
            </div>
            <p className="text-sm">{t.body}</p>
            <div className="mt-2 grid gap-1">
              {(t.messages || []).map((m: any) => (
                <div key={m.id} className="text-sm">
                  <b>{m.sender_id?.slice(0, 6)}:</b> {m.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
