/**
 * Eureka API Client
 * Seamlessly interfaces with FastAPI backend at /api/v1 with graceful fallback
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: Error | null; live: boolean }> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Org-Id': 'org_tangentia_global',
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return { data, error: null, live: true };
  } catch (err: any) {
    // Graceful offline fallback
    console.debug(`Backend endpoint ${endpoint} offline or unreachable, falling back to local store:`, err.message);
    return { data: null, error: err, live: false };
  }
}
