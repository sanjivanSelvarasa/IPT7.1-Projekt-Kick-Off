<script lang="ts" setup>
import NavApp from "@/components/layout/NavApp.vue";

</script>

<template>
  <div class="overflow-x-hidden bg-[var(--background-color)] w-full min-h-[100vh] h-full mx-auto">
    <NavApp></NavApp>

    <header class="w-full flex items-center justify-between gap-5 mt-40 max-w-[1200px] xl:mx-auto px-5">
      <div class="flex flex-col items-start justify-between gap-2">
        <span class="uppercase text-[var(--primary-color)]">Verwaltung</span>
        <h1>Einstellungen</h1>
        <span class="text-[var(--text-color-light)]">Verwalte dein Konto, deine Sprache und Sicherheitseinstellungen</span>
      </div>
    </header>

    <main class="w-full flex flex-col items-start justify-center gap-10 mt-10 px-4 xl:mx-auto">
      <div class="w-full border border-gray-200 rounded-2xl overflow-hidden px-8 py-8 bg-[var(--surface-color)]">
        <div class="flex items-center justify-start gap-3">
          <div class="flex justify-center items-center w-[35px] h-[35px] bg-blue-50 text-[var(--primary-color)] rounded-lg">
            <i class="fa-solid fa-language"></i>
          </div>
          <div class="flex flex-col gap-1 justify-center items-start">
            <span class="font-semibold">Sprache</span>
            <span class="text-[var(--text-color-light)] text-sm">Wähle deine bevorzugte Anzeigesprache</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex flex-col items-start justify-center gap-3">
          <label class="font-medium text-sm" for="language">Anzeigesprache</label>
          <select class="w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" name="language" id="language">
            <option>Deutsch</option>
            <option>Englisch</option>
            <option>Französisch</option>
          </select>

          <div class="w-full flex items-center justify-end">
            <button class="flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[var(--primary-color)] text-[var(--text-color-white)] rounded-lg">
              <div class="flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span>Sprache speichern</span>
            </button>
          </div>
        </div>
      </div>

      <div class="w-full border border-gray-200 rounded-2xl overflow-hidden px-8 py-8 bg-[var(--surface-color)]">
        <div class="flex items-center justify-start gap-3">
          <div class="flex justify-center items-center w-[35px] h-[35px] bg-blue-50 text-[var(--primary-color)] rounded-lg">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div class="flex flex-col gap-1 justify-center items-start">
            <span class="font-semibold">Sicherheit</span>
            <span class="text-[var(--text-color-light)] text-sm">Passwort und Kontosicherheit verwalten</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex flex-col items-start justify-center gap-7">
          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="currPassword">Passwort</label>
            <input class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="currPassword" id="currPassword" placeholder="••••••••" />
          </div>

          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="newPassword">Neues Passwort</label>
            <input class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="newPassword" id="newPassword" placeholder="mind. 8 Zeichen" />
          </div>

          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="newPasswordConfirm">Neues Passwort bestätigen</label>
            <input class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="newPasswordConfirm" id="newPasswordConfirm" placeholder="Passwort wiederholen" />
          </div>

          <div class="w-full flex items-center justify-end">
            <button class="flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[var(--primary-color)] text-[var(--text-color-white)] rounded-lg">
              <div class="flex items-center justify-center">
                <i class="fa-solid fa-lock"></i>
              </div>
              <span>Passwort ändern</span>
            </button>
          </div>
        </div>
      </div>

      <div class="w-full border border-gray-200 rounded-2xl overflow-hidden px-8 py-8 bg-red-50">
        <div class="flex items-center justify-start gap-3">
          <div class="flex justify-center items-center w-[35px] h-[35px] bg-red-100 text-red-500 rounded-lg">
            <i class="fa-solid fa-exclamation"></i>
          </div>
          <div class="flex flex-col gap-1 justify-center items-start">
            <span class="font-semibold text-red-500">Gefahrenbereich</span>
            <span class="text-[var(--text-color-light)] text-sm">Irreversible Aktionen - mit Vorsicht bedienen</span>
          </div>
        </div>

        <div class="divider bg-red-200!"></div>

        <div class="flex items-center justify-between">
          <div>
            <span class="text-red-500">Account löschen</span>
            <p class="text-sm text-red-600 max-w-[400px]">Alle Daten, Fortschritte und Einstellungen werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.</p>
          </div>
          <button class="flex items-center justify-center gap-1 text-red-500 rounded-lg px-4 py-2 border border-red-200">
            <div class="flex items-center justify-center">
              <i class="fa-solid fa-trash-can"></i>
            </div>
            <span class="text-nowrap">Account löschen</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
