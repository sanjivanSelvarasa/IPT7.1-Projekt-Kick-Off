import {defineStore} from "pinia";
import {ref} from "vue";
import {loginApi, logoutApi, registerApi, tokenApi} from "@/api/auth.api.ts";

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
      await loginApi(email, password)
    }catch(err){
      error.value = err ? err.text : 'Login failed'
    }
  }

  async function logout(token: string) {
    try{
      await logoutApi(token)
    }catch(err){
      error.value = err ? err.text : 'Logout failed'
    }
  }

  async function refreshToken(accessToken: string){
    error.value = null
    try{
      await tokenApi(accessToken)
    }catch(err){
      error.value = err ? err.text : 'getting refresh token failed'
    }
  }

  return {register, login, logout, refreshToken, error, token}
})
