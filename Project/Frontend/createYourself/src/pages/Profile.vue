<script lang="ts" setup>

import NavApp from "@/components/layout/NavApp.vue";
</script>

<template>
  <div class="overflow-x-hidden bg-[var(--background-color)] w-full min-h-[100vh] h-full mx-auto">

    <NavApp @logout=""></NavApp>

    <header class="w-full flex items-center justify-start gap-5 mt-40 xl:mx-auto px-5">
      <div class="flex flex-col items-start justify-between gap-2">
        <span class="uppercase text-[var(--primary-color)]">Verwaltung</span>
        <h1>Mein Profil</h1>
        <span class="text-[var(--text-color-light)]">Verwalte deine persönlichen Daten und Kontoeinstellungen</span>
      </div>
    </header>
    <main class="w-full flex flex-col items-start justify-center gap-10 mt-10 px-4 xl:mx-auto">
      <div class="w-full border border-gray-200 rounded-2xl overflow-hidden px-8 py-8 bg-[var(--surface-color)]">
        <div class="w-full flex items-center justify-start gap-4">
          <div class="select-none flex items-center justify-center bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-[var(--text-color-white)] font-bold text-3xl rounded-full w-[100px] h-[100px]">
            AS
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-nowrap font-semibold">Anna Schmidt</p>
            <button class="cursor-pointer px-2.5 py-1.5 rounded-lg text-[var(--primary-color)] bg-blue-50 border border-blue-300 text-xs">
              <div class="flex items-center justify-center gap-1">
                <div class="flex items-center justify-center text-sm">
                  <i class="fa-regular fa-image"></i>
                </div>
                <span>Profilbild ändern</span>
              </div>
            </button>
          </div>
        </div>

        <div class="w-full h-[1px] bg-gray-200 my-4"></div>

        <div>
          <span class="uppercase text-[var(--text-color-light)] text-sm font-semibold">Persönliche Daten</span>

          <form class="my-5">

            <div class="flex items-center justify-center gap-2">
              <div class="w-full flex flex-col items-start justify-center gap-1">
                <label for="fname" class="text-sm font-semibold text-[var(--text-color-light)]">Vorname</label>
                <input disabled class="outline-none w-full cursor-not-allowed bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="text" name="fname" id="fname" placeholder="Anna" autocomplete="off" />
              </div>
              <div class="w-full flex flex-col items-start justify-center gap-1">
                <label for="lname" class="text-sm font-semibold text-[var(--text-color-light)]">Nachname</label>
                <input disabled class=" outline-none w-full cursor-not-allowed bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="text" name="lname" id="lname" placeholder="Schmidt" autocomplete="off" />
              </div>
            </div>

            <div class="w-full flex flex-col items-start justify-center gap-1 mt-4">
              <label for="username" class="text-sm font-semibold text-[var(--text-color-light)]">Benutzername</label>
              <input disabled class="outline-none w-full cursor-not-allowed bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="text" name="username" id="username" placeholder="Anna.Schmidt" autocomplete="off" />
            </div>

            <div class="w-full flex flex-col items-start justify-center gap-1 mt-4">
              <label for="email" class="text-sm font-semibold text-[var(--text-color-light)]">E-Mail</label>
              <input disabled class="outline-none w-full cursor-not-allowed bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="email" name="email" id="email" placeholder="anna.schmidt@sluz.ch" autocomplete="off" />
            </div>

            <div class="w-full flex flex-col items-start justify-center gap-1 mt-4">
              <label for="email" class="text-sm font-semibold text-[var(--text-color-light)]">Kurzbeschreibung</label>
              <textarea disabled class="outline-none w-full cursor-not-allowed bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="email" name="email" id="email" placeholder="Ich bin Programmierer in Luzern und erstelle Applikationen ..." autocomplete="off" />
              <div class="flex w-full items-center justify-end text-xs text-[var(--text-color-light)]">
                <span>87 / 220 Zeichen</span>
              </div>
            </div>
          </form>

          <div class="pt-8 border border-t-gray-200 border-transparent">
            <div class="flex items-center justify-end gap-2">
              <button class="px-4 py-2 rounded-lg border border-gray-200 font-semibold bg-transparent text-[var(--text-color-light)]">Abbrechen</button>
              <button class="px-4 py-2 rounded-lg border border-gray-200 text-[var(--text-color-white)] bg-[var(--primary-color)]">Änderungen speichern</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
