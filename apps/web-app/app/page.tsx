import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>ELS Web Dashboard</h1>
      <p>Ve al panel principal:</p>
      <Link href="/dashboard">Ir a Dashboard</Link>
    </div>
  );
}
