<script setup lang="ts">

import Logo from "@/components/ui/Logo.vue";
</script>

<template>
  <div class="absolute top-0 left-0 w-full bg-[var(--surface-color)] shadow-sm h-[65px] flex items-center justify-center">
    <div class="flex items-center justify-between w-[1400px] px-4 py-2">
      <!-- Logo-->
      <Logo link="/"></Logo>

      <!-- Section Links-->
      <div>
        <ul class="flex items-center justify-center gap-8 text-sm text-[var(--text-color-light)] font-semibold">
          <li class="hover:text-[var(--text-color)] transition duration-200">
            <a href="#">Funktionen</a>
          </li>
          <li class="hover:text-[var(--text-color)] transition duration-200">
            <a href="#">Editor</a>
          </li>
          <li class="hover:text-[var(--text-color)] transition duration-200">
            <a href="#">Wie es funktioniert</a>
          </li>
          <li class="hover:text-[var(--text-color)] transition duration-200">
            <a href="#">Veröffentlichen</a>
          </li>
        </ul>
      </div>

      <!-- Login / Register-->
      <div class="flex items-center justify-center gap-4">
        <RouterLink to="/" class="px-4 py-2 border border-gray-200 rounded-lg text-[var(--text-color-light)] font-semibold">Anmelden</RouterLink>
        <RouterLink to="/" class="px-4 py-2 bg-[var(--primary-color)] rounded-lg font-semibold text-[var(--text-color-white)]">Registrieren</RouterLink>
      </div>
    </div>
  </div>
</template>
