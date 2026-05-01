const API_URL = "http://localhost:3000";
import { useAuthStore } from "@/stores/authStore.ts";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const authStore = useAuthStore();

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    }
  });

  if(res.status === 401 || res.status === 403) {
    try{
      await authStore.refreshToken();

      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
          ...(authStore.token ? { Authorization: `BEARER ${authStore.token}` } : {}),
        }
      })
    }catch(err){
      const text = await res.text();
      throw new Error(`ERROR: ${res.status}: ${text}`);
    }
  }

  if(!res.ok){
    const text = await res.text();

    console.log(`ERROR: ${res.status}: ${text}`);
    throw new Error(`ERROR: ${res.status}: ${text}`);
  }

  return res.json();
}
