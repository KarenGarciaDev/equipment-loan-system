export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestArgs = {
  url: string;
  method: Method;
  data?: any;
  headers?: Record<string, string>;
};

export const http = {
  async request<T = any>({ url, method, data, headers }: RequestArgs): Promise<T> {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(headers ?? {}),
      },
      body: method === "GET" || method === "DELETE" ? undefined : JSON.stringify(data ?? {}),
      cache: "no-store",
    });

    const text = await res.text();
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      // si no es JSON, queda null
    }

    if (!res.ok) {
      const msg = json?.message ?? `${res.status} ${res.statusText}`;
      throw new Error(msg);
    }

    return json as T;
  },
};
