import {defineStore} from "pinia";
import {ref} from "vue";
import {loginApi, logoutApi, registerApi, tokenApi} from "@/api/auth.api.ts";
import type {tokenType} from "@/types/tokenType.ts";

export const useAuthStore = defineStore('auth', () => {
  const error = ref<string | null>(null)
  const token = ref<string | null>(null)

  async function register(email: string, password: string) {
    error.value = null
    try{
      await registerApi(email, password)
    }catch(err){
      error.value = err ? err.text : 'Register failed'
    }
  }

  async function login(email: string, password: string) {
    error.value = null

    try{
      const data = await loginApi(email, password)
      token.value = data.accessToken
      localStorage.setItem("token", data.accessToken)
    }catch(err){
      error.value = err ? err.text : 'Login failed'
    }
  }

  async function logout() {
    try{
      await logoutApi(localStorage.getItem("token") ?? "")
      token.value = null
      localStorage.removeItem("token")
    }catch(err){
      error.value = err ? err.text : 'Logout failed'
    }
  }

  async function refreshToken(){
    error.value = null
    localStorage.removeItem("token")

    try{
      const data = await tokenApi()
      token.value = data
      localStorage.setItem("token", data)
    }catch(err){
      error.value = err ? err.text : 'Getting refresh token failed'
    }
  }

  return {register, login, logout, refreshToken, error, token}
})
