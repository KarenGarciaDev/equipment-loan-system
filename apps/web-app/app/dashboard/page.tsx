import Link from "next/link";

const items = [
  { href: "/auth", title: "Auth", desc: "Login / JWT" },
  { href: "/users", title: "Users", desc: "CRUD de usuarios" },
  { href: "/inventory", title: "Inventory", desc: "Equipos / stock" },
  { href: "/loans", title: "Loans", desc: "Préstamos" },
  { href: "/reservations", title: "Reservations", desc: "Reservas" },
  { href: "/reports", title: "Reports", desc: "Reportes" },
  { href: "/automation", title: "Automation", desc: "Automatizaciones" },
  { href: "/integration", title: "Integration", desc: "Integraciones" },
  { href: "/notifications", title: "Notifications", desc: "Notificaciones" },
  { href: "/audit", title: "Audit", desc: "Auditoría" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p className="muted">Un solo frontend para todos tus microservicios.</p>

      <div className="grid">
        {items.map((x) => (
          <Link key={x.href} href={x.href} className="card">
            <h3 style={{ marginTop: 0 }}>{x.title}</h3>
            <div className="muted">{x.desc}</div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 14 }} className="card">
        <h3 style={{ marginTop: 0 }}>Tip</h3>
        <p className="muted">
          Usa <b>API Explorer</b> para probar endpoints rápido aunque todavía no tengas UI bonita.
        </p>
        <Link href="/explorer">Ir a API Explorer →</Link>
      </div>
    </div>
  );
}
