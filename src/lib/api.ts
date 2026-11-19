const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const AUTH_URL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

/** Thrown for every failed backend request. `status` is 0 when the server is unreachable. */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type CachedToken = { token: string; at: number };
let cachedToken: CachedToken | null = null;
const TOKEN_TTL = 10 * 60 * 1000; // tokens live 15m, refresh early

export function clearTokenCache() {
  cachedToken = null;
}

/**
 * Better Auth issues the JWT from `GET /api/auth/token`.
 * The cookie is sent along, so this only works for a signed-in user.
 */
async function getToken(force = false): Promise<string | null> {
  if (!force && cachedToken && Date.now() - cachedToken.at < TOKEN_TTL) {
    return cachedToken.token;
  }

  try {
    const res = await fetch(`${AUTH_URL}/api/auth/token`, {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) {
      cachedToken = null;
      return null;
    }
    const data = await res.json().catch(() => null);
    const token = typeof data?.token === "string" ? data.token : null;
    cachedToken = token ? { token, at: Date.now() } : null;
    return token;
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  retried = false
): Promise<T> {
  const token = await getToken();
  const headers = new Headers(init.headers);

  if (init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers,
      credentials: "include",
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Could not reach the server. Please try again.",
      0
    );
  }

  // Stale token: drop the cache and try once more with a fresh one.
  if (res.status === 401 && !retried) {
    clearTokenCache();
    return request<T>(path, init, true);
  }

  const text = await res.text();
  let json: Record<string, unknown> | null = null;
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    throw new ApiError(
      extractMessage(json, res.status),
      res.status
    );
  }

  return json as T;
}

function extractMessage(json: Record<string, unknown> | null, status: number) {
  if (json && typeof json.message === "string" && json.message) {
    return json.message;
  }
  if (json?.error && typeof json.error === "object") {
    const msg = (json.error as { message?: string }).message;
    if (msg) return msg;
  }
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to do that.";
  if (status === 404) return "The requested resource was not found.";
  if (status === 409) return "This action conflicts with the current state.";
  if (status === 429) return "Too many requests. Please slow down.";
  return `Request failed (${status}).`;
}

function buildQuery(params?: Record<string, string | number | undefined | null>) {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const api = {
  get: <T>(
    path: string,
    params?: Record<string, string | number | undefined | null>
  ) => request<T>(`${path}${buildQuery(params)}`),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PUT",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),

  delete: <T>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};
