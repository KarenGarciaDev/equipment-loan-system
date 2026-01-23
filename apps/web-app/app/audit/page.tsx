import { ENV } from "../lib/env";

export default function AuditPage() {
  return (
    <div>
      <h1>Audit</h1>
      <p>Consume Kafka y guarda eventos en Mongo (consumer-only).</p>

      <h3>Verificación</h3>
      <ul>
        <li>Kafka UI: <a href={ENV.KAFKA_UI} target="_blank" rel="noreferrer">Abrir</a></li>
        <li>Logs: <code>docker logs -f api-audit</code></li>
      </ul>
    </div>
  );
}
