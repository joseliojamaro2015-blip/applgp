import './globals.css';

export const metadata = {
  title: 'APP LG',
  description: 'Clube Gym Pass - Área do Membro e Admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <header className="border-b bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-semibold">APP LG</a>
            <nav className="text-sm flex gap-4">
              <a className="hover:underline" href="/dashboard">Dashboard</a>
              <a className="hover:underline" href="/tickets">Tickets</a>
              <a className="hover:underline" href="/crm/leads">Leads</a>
              <a className="hover:underline" href="/admin">Admin</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
