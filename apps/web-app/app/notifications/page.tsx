import { ENV } from "../lib/env";

export default function NotificationsPage() {
  return (
    <div>
      <h1>Notifications</h1>
      <p>Este microservicio consume Kafka (consumer-only). No tiene REST para el navegador.</p>

      <h3>Verificación</h3>
      <ul>
        <li>Kafka UI: <a href={ENV.KAFKA_UI} target="_blank" rel="noreferrer">Abrir</a></li>
        <li>Logs: <code>docker logs -f api-notifications</code></li>
      </ul>
    </div>
  );
}
