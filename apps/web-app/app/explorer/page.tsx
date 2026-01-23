"use client";

import { useMemo, useState } from "react";
import { ServiceKey } from "../lib/services";
import { SERVICES } from "../lib/services";
import { http } from "../lib/http";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export default function ExplorerPage() {
  const serviceKeys = useMemo(() => Object.keys(SERVICES) as ServiceKey[], []);
  const [service, setService] = useState<ServiceKey>("users");
  const [method, setMethod] = useState<Method>("GET");
  const [path, setPath] = useState<string>("/health");
  const [body, setBody] = useState<string>('{}');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  async function send() {
    setLoading(true);
    setError("");
    setResult(null);
const baseUrl = SERVICES[service]; // ✅ ahora es string
if (!baseUrl) {
  setError(`Falta URL para ${service}. Revisa .env.local`);
  setLoading(false);
  return;
}

// Si baseUrl ya apunta a un endpoint final (ej: /auth/login),
// entonces NO le concatenes path. Solo usa baseUrl.
const url = baseUrl;

    try {
      const data = method === "GET" || method === "DELETE"
        ? undefined
        : JSON.parse(body || "{}");

      const res = await http.request({
        url,
        method,
        data,
        headers: { "Content-Type": "application/json" },
      });

      setResult({
        status: res.status,
        headers: res.headers,
        data: res.data,
        url,
      });
    } catch (e: any) {
      const status = e?.response?.status;
      const data = e?.response?.data;
      setError(
        JSON.stringify(
          { message: e?.message, status, data, url },
          null,
          2
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>API Explorer</h1>
      <p className="muted">
        Prueba endpoints sin adivinar UI. Si te da 404, revisa el prefijo real (api/v1 vs v1/api).
      </p>

      <div className="card" style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div className="muted">Servicio</div>
            <select className="select" value={service} onChange={(e) => setService(e.target.value as ServiceKey)}>
              {serviceKeys.map((k) => (
                <option key={k} value={k}>
                  {SERVICES[k].name} — {SERVICES[k].baseUrl || "(sin baseUrl)"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="muted">Método</div>
            <select className="select" value={method} onChange={(e) => setMethod(e.target.value as Method)}>
              {["GET","POST","PUT","PATCH","DELETE"].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div>
          <div className="muted">Path (ej: /api/reports, /users, /auth/login)</div>
          <input className="input" value={path} onChange={(e) => setPath(e.target.value)} />
        </div>

        {method !== "GET" && method !== "DELETE" && (
          <div>
            <div className="muted">Body JSON</div>
            <textarea className="textarea" rows={6} value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
        )}

        <button className="btn" onClick={send} disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {error && (
        <div className="card" style={{ marginTop: 12, borderColor: "#7a1f1f" }}>
          <h3 style={{ marginTop: 0 }}>Error</h3>
          <pre>{error}</pre>
        </div>
      )}

      {result && (
        <div className="card" style={{ marginTop: 12 }}>
          <h3 style={{ marginTop: 0 }}>Respuesta</h3>
          <div className="muted">Status: {result.status}</div>
          <div className="muted">URL: {result.url}</div>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
