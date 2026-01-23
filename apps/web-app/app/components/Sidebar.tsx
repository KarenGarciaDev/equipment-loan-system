"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/auth", label: "Auth" },
  { href: "/users", label: "Users" },
  { href: "/inventory", label: "Inventory" },
  { href: "/loans", label: "Loans" },
  { href: "/reservations", label: "Reservations" },
  { href: "/reports", label: "Reports" },
  { href: "/automation", label: "Automation" },
  { href: "/integration", label: "Integration" },
  { href: "/notifications", label: "Notifications" },
  { href: "/audit", label: "Audit" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: 260, borderRight: "1px solid #222", padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Equipment Loan System</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                textDecoration: "none",
                background: active ? "#1f2937" : "transparent",
                color: active ? "white" : "#cbd5e1",
                border: "1px solid #222",
              }}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
