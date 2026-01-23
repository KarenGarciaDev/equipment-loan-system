import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <div className="brand">ELS • Dashboard</div>

            <nav className="nav">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/explorer">API Explorer</Link>
              <hr />
              <Link href="/auth">Auth</Link>
              <Link href="/users">Users</Link>
              <Link href="/inventory">Inventory</Link>
              <Link href="/loans">Loans</Link>
              <Link href="/reservations">Reservations</Link>
              <Link href="/reports">Reports</Link>
              <Link href="/automation">Automation</Link>
              <Link href="/integration">Integration</Link>
              <Link href="/notifications">Notifications</Link>
              <Link href="/audit">Audit</Link>
            </nav>
          </aside>

          <main className="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
