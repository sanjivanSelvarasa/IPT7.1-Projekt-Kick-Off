<script setup lang="ts">
import Logo from "@/components/ui/Logo.vue";
import {ref} from "vue";

const props = defineProps<{
  langSelected: string,
}>()

const emit = defineEmits<{
  (e: 'lang', value: string): void
}>()

function onLang(): void{
  emit('lang', currLang.value)
}

const currLang = ref<string>(props.langSelected)
</script>

<template>
  <div class="z-999 fixed top-0 left-0 w-full bg-[var(--surface-color)] shadow-sm h-[65px] flex items-center justify-center">
    <div class="flex items-center justify-between w-[1200px] px-4 py-2 h-full">
      <!-- Logo-->
      <Logo class="no-link-active" link="/"></Logo>

      <!-- Section Links-->
      <div class="h-full flex items-center">
        <ul class="flex items-center justify-center gap-4 text-sm text-[var(--text-color-light)] font-semibold">
          <li class="hover:text-[var(--text-color)] transition duration-200 cursor-pointer">
            <a class="inline-block px-2 py-2" href="/#function">Funktionen</a>
          </li>
          <li class="hover:text-[var(--text-color)] transition duration-200">
            <a class="inline-block px-2 py-2" href="/#editor">Editor</a>
          </li>
          <li class="hover:text-[var(--text-color)] transition duration-200">
            <a class="inline-block px-2 py-2" href="/#howWorks">Wie es funktioniert</a>
          </li>
          <li class="hover:text-[var(--text-color)] transition duration-200">
            <a class="inline-block px-2 py-2" href="/#public">Veröffentlichen</a>
          </li>
        </ul>
      </div>

      <!-- Login / Register-->
      <div class="flex items-center justify-center gap-4">
        <RouterLink to="/login" class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] duration-150 transition px-4 py-2 border border-gray-200 rounded-lg text-[var(--text-color-light)] font-semibold">Anmelden</RouterLink>
        <RouterLink to="/register" class="hover:-translate-y-0.5 hover:scale-101 hover:shadow-lg duration-150 transition px-4 py-2 bg-[var(--primary-color)] rounded-lg font-semibold text-[var(--text-color-white)]">Registrieren</RouterLink>
      </div>

      <div>
        <select v-model="currLang" @change="onLang()" name="lang" id="lang" class="absolute top-0 right-0 p-2 m-2 cursor-pointer border border-gray-200 text-[var(--text-color-light)] rounded-lg">
          <option :selected="props.langSelected === 'de' || !props.langSelected" value="de" class="flex items-center justify-center gap-2">
            <div class="flex items-center justify-center">
              <i class="fa-solid fa-flag"></i>
            </div>
            <span>Deutsch</span>
          </option>
          <option :selected="props.langSelected === 'en' " value="en" class="flex items-center justify-center gap-2">
            <span>English</span>
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style>
.router-link-exact-active:not(.no-link-active){
  color: var(--primary-color);
  background-color: var(--primary-color-light);
}
</style>
