'use client';
export const dynamic = 'force-dynamic';

import { getSupabase } from '@/lib/supabase-client';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function sendLink(e: any) {
    e.preventDefault();
    try {
      const supabase = getSupabase();
      const redirectTo = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });

      // alguns provedores retornam 204 sem JSON; trate como sucesso
      if (!error) {
        setSent(true);
        return;
      }
      alert(error.message);
    } catch (err: any) {
      const msg = String(err?.message || err);
      if (msg.includes('Unexpected end of JSON input')) {
        // resposta sem corpo (204) => ok
        setSent(true);
        return;
      }
      console.error('OTP error:', err);
      alert(msg);
    }
  }

  return (
    <div className="card max-w-md mx-auto">
      <h1>Entrar</h1>
      <form onSubmit={sendLink} className="grid gap-2">
        <input
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button className="btn btn-primary">Enviar link mágico</button>
      </form>
      {sent && <p className="mt-2 text-green-700 text-sm">Link enviado! Verifique seu e-mail.</p>}
    </div>
  );
}
