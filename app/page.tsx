export default function Home() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Clube Gym Pass</h1>
        <p className="text-slate-600 mt-2">Bem-vindo! Acesse sua conta para continuar.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <a href="/login" className="btn btn-primary">Entrar</a>
          <a href="/login" className="btn border">Criar conta</a>
        </div>
      </div>
    </div>
  );
}
