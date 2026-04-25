<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

const showPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

async function submit() {
  error.value = null

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwörter stimmen nicht überein.'
    return
  }

  if (password.value.length < 8) {
    error.value = 'Passwort muss mindestens 8 Zeichen lang sein.'
    return
  }

  isLoading.value = true

  try {
    await authStore.register(email.value, password.value)

    if (authStore.error) {
      error.value = authStore.error
      return
    }

    await router.push('/login')
  } catch (err: any) {
    error.value = err?.message ?? 'Registrierung ist fehlgeschlagen.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-[var(--background-color)]">
    <div class="absolute inset-0 grid-bg"></div>
    <div class="absolute inset-0 header-bg"></div>

    <main class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
      <div class="mb-8 text-center text-2xl font-bold">
  <span class="text-[var(--text-color)]">Create</span>
  <span
    class="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]
           bg-clip-text text-transparent"
  >Yourself
  </span>
</div>

      <div class="mb-8 flex w-full max-w-[430px] rounded-lg bg-slate-200/70 p-1 shadow-sm">
        <button
          type="button"
          class="w-1/2 rounded-md py-3 text-sm font-semibold text-[var(--text-color-light)] transition hover:text-[var(--primary-color)]"
          @click="router.push('/login')"
        >
          Anmelden
        </button>

        <button
          type="button"
          class="w-1/2 rounded-md bg-[var(--surface-color)] py-3 text-sm font-semibold text-[var(--text-color)] shadow-sm"
        >
          Registrieren
        </button>
      </div>

      <form
        class="w-full max-w-[430px] rounded-3xl bg-[var(--surface-color)] p-9 shadow-xl"
        @submit.prevent="submit"
      >
        <div class="mb-7">
          <h1 class="text-2xl font-bold text-[var(--text-color)]">
            Konto erstellen
          </h1>
          <p class="mt-2 text-sm text-[var(--text-color-light)]">
            Starte kostenlos und baue dein erstes Portfolio in Minuten.
          </p>
        </div>

        <div class="mb-5">
          <label class="mb-2 block text-sm font-semibold text-[var(--text-color)]">
            E-Mail-Adresse
          </label>

          <div
            class="flex items-center gap-3 rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 transition focus-within:border-[var(--primary-color)]"
          >
            <i class="fa-regular fa-envelope text-[var(--text-color-light)]"></i>

            <input
              v-model="email"
              class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              type="email"
              placeholder="name@example.com"
              autocomplete="email"
              required
            />
          </div>
        </div>

        <div class="mb-5">
          <label class="mb-2 block text-sm font-semibold text-[var(--text-color)]">
            Passwort
          </label>

          <div
            class="flex items-center gap-3 rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 transition focus-within:border-[var(--primary-color)]"
          >
            <i class="fa-solid fa-lock text-[var(--text-color-light)]"></i>

            <input
              v-model="password"
              class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Min. 8 Zeichen"
              autocomplete="new-password"
              required
            />

            <button
              type="button"
              class="text-[var(--text-color-light)] transition hover:text-[var(--primary-color)]"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="mb-2 block text-sm font-semibold text-[var(--text-color)]">
            Passwort bestätigen
          </label>

          <div
            class="flex items-center gap-3 rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 transition focus-within:border-[var(--primary-color)]"
          >
            <i class="fa-solid fa-lock text-[var(--text-color-light)]"></i>

            <input
              v-model="confirmPassword"
              class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Passwort wiederholen"
              autocomplete="new-password"
              required
            />

            <button
              type="button"
              class="text-[var(--text-color-light)] transition hover:text-[var(--primary-color)]"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <i :class="showConfirmPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
            </button>
          </div>
        </div>

        <p v-if="error" class="mb-4 text-sm font-medium text-red-500">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="isLoading || !email || !password || !confirmPassword"
          class="w-full rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-semibold text-[var(--text-color-white)] shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {{ isLoading ? 'Lädt...' : 'Konto erstellen' }}
        </button>

        <div class="my-6 flex items-center gap-4">
          <div class="h-px flex-1 bg-gray-200"></div>
          <span class="text-xs text-[var(--text-color-light)]">oder</span>
          <div class="h-px flex-1 bg-gray-200"></div>
        </div>

        <div class="text-center text-sm text-[var(--text-color-light)]">
          Bereits registriert?
          <button
            type="button"
            class="font-semibold text-[var(--primary-color)] transition hover:underline"
            @click="router.push('/login')"
          >
            Anmelden
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.header-bg {
  background: linear-gradient(
    to bottom right,
    rgba(37, 99, 235, 0.12),
    transparent,
    rgba(124, 58, 237, 0.12)
  );
}

.grid-bg {
  opacity: 0.15;
}
</style>