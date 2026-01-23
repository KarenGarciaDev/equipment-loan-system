import Link from "next/link";

export default function UsersPage() {
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>Users</h1>
      <p className="muted">
        Aquí luego hacemos el CRUD bonito. Por ahora prueba endpoints desde el Explorer.
      </p>
      <Link href="/explorer">Ir al Explorer →</Link>
    </div>
  );
}
