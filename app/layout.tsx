import './globals.css';import Link from 'next/link';
export const metadata={title:'APP LG',description:'Clube Gym Pass — App Unificado'};
export default function RootLayout({children}:{children:React.ReactNode}){
return(<html lang="pt-br"><body><header className="card"><div className="max-w-6xl mx-auto flex items-center justify-between">
<Link href="/" className="font-semibold">APP LG</Link><nav className="flex gap-4 text-sm">
<Link href="/dashboard">Dashboard</Link><Link href="/wallet">Carteirinha</Link><Link href="/academias/scanner">Scanner</Link><Link href="/crm/leads">CRM</Link><Link href="/tickets">Tickets</Link><Link href="/admin">Admin</Link>
</nav></div></header><main className="max-w-6xl mx-auto p-4">{children}</main></body></html>);}