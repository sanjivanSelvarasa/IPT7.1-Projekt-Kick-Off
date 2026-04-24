const API_URL = "http://localhost:3000";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      ...(options?.headers || {}),
    }
  });

  if(!res.ok){
    const text = await res.text();

    console.log(`ERROR: ${res.status}: ${text}`);
    throw new Error(`ERROR: ${res.status}: ${text}`);
  }

  return res.json();
}
