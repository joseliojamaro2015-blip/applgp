'use client';
export const dynamic = 'force-dynamic';

import { getSupabase } from '@/lib/supabase-client';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function sendLink(e: any) {
    e.preventDefault();
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          (process.env.NEXT_PUBLIC_SITE_URL || location.origin) + '/dashboard',
      },
    });
    if (!error) setSent(true);
    else alert(error.message);
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
      {sent && <p>Link enviado!</p>}
    </div>
  );
}
