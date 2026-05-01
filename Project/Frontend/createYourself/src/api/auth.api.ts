import {apiFetch} from "@/api/api.ts";
import type {tokenType} from "@/types/tokenType.ts";

export async function registerApi(email: string, password: string){
  return apiFetch(`/users/register`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

export async function loginApi(email: string, password: string) : Promise<tokenType> {
  return apiFetch(`/users/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

export async function logoutApi(token: string){
  return apiFetch(`/users/logout`, {
    method: 'DELETE',
    headers: {
      Authorization: `BEARER ${token}`,
    }
  })
}

export async function tokenApi() : Promise<string> {
  return await apiFetch(`/token`, {
    method: 'POST',
  })
}
