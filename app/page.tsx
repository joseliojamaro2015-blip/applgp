import Link from 'next/link';
export default function Home(){return(<div className="grid gap-4">
<h1 className="text-2xl font-semibold">Bem-vindo ao APP LG</h1>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
<div className="card"><h3>Membros</h3><p>Dashboard e carteirinha</p><Link className="btn" href="/dashboard">Abrir</Link></div>
<div className="card"><h3>Academias</h3><p>Scanner e check-ins</p><Link className="btn" href="/academias/scanner">Abrir</Link></div>
<div className="card"><h3>Admin</h3><p>Filiais, permissões</p><Link className="btn" href="/admin">Abrir</Link></div>
<div className="card"><h3>CRM</h3><p>Leads → membros</p><Link className="btn" href="/crm/leads">Abrir</Link></div>
<div className="card"><h3>Tickets</h3><p>Atendimento interno</p><Link className="btn" href="/tickets">Abrir</Link></div>
<div className="card"><h3>Benefícios</h3><p>Catálogo + cupons</p><Link className="btn" href="/beneficios">Abrir</Link></div>
</div></div>);}