"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/lib/http";
import { SERVICES } from "@/lib/services";
import { setToken, setUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await http.request<any>({
        url: SERVICES.authLogin,   // ✅ ya es /auth/login
        method: "POST",
        data: { email, password },
        auth: false,
      });

      const token = res?.accessToken || res?.token;
      if (!token) throw new Error("No token in login response");

      setToken(token);

      // si tu backend devuelve user
      if (res?.user) setUser(res.user);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
      {error ? <p style={{ color: "tomato" }}>{error}</p> : null}
      <button type="submit">Login</button>
    </form>
  );
}
