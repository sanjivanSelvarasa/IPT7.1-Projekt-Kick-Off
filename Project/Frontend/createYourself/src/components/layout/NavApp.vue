<script setup lang="ts">
import Logo from "@/components/ui/Logo.vue";
import {ref} from "vue";

const emit = defineEmits<{
  (e: 'logout'): void;
}>()

function onLogout() {
  emit('logout');
}

const showBugermenu = ref<boolean>(false);
</script>

<template>
  <div class="z-999 fixed top-0 left-0 w-full bg-[var(--surface-color)] shadow-sm h-[65px] flex items-center justify-center">
    <div class="flex flex-row-reverse sm:flex-row items-center justify-between w-[1200px] px-4 py-2 h-full">
      <!-- Logo-->
      <Logo class="no-link-active" link="/dashboard"></Logo>

      <!-- Burger menu-->
      <div class="sm:hidden block cursor-pointer text-[var(--text-color)] text-xl">
        <button @click="showBugermenu = !showBugermenu" class="cursor-pointer flex items-center justify-center">
          <i class="fa-solid fa-bars"></i>
        </button>

        <div :class="showBugermenu ? 'active-burger-menu' : '' " class="hidden absolute top-16.5 left-0 z-999 w-full h-fit bg-[var(--surface-color)] mx-2 py-3">
          <ul class="flex flex-col items-center justify-center gap-3 text-sm text-[var(--text-color-light)] font-semibold">
            <li class="w-full hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg transition duration-200 cursor-pointer">
              <RouterLink to="/dashboard" class="cursor-pointer rounded-lg flex items-center justify-center gap-2 px-2 py-2">
                <div class="flex items-center justify-center ">
                  <i class="fa-solid fa-box-open"></i>
                </div>
                <span>Dashboard</span>
              </RouterLink>
            </li>
            <li class="w-full hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg transition duration-200">
              <RouterLink to="/profile" class="cursor-pointer rounded-lg flex items-center justify-center gap-2 px-2 py-2">
                <div class="flex items-center justify-center ">
                  <i class="fa-regular fa-user"></i>
                </div>
                <span>Profil</span>
              </RouterLink>
            </li>
            <li class="w-full hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg transition duration-200">
              <RouterLink to="/settings" class="cursor-pointer rounded-lg flex items-center justify-center gap-2 px-2 py-2">
                <div class="flex items-center justify-center ">
                  <i class="fa-solid fa-gear"></i>
                </div>
                <span>Einstellungen</span>
              </RouterLink>
            </li>
            <li class="w-full group hover:text-[var(--primary-color)] rounded-lg transition duration-200">
              <button @click="onLogout" class="w-full group-hover:border-[var(--primary-color)] cursor-pointer rounded-lg border border-gray-200 flex items-center justify-center gap-2 px-2 py-2">
                <div class="flex items-center justify-center ">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
                <span>Abmelden</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Section Links-->
      <div class="sm:flex hidden h-full items-center">
        <ul class="flex items-center justify-center gap-4 text-sm text-[var(--text-color-light)] font-semibold">
          <li class="hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg transition duration-200 cursor-pointer">
            <RouterLink to="/dashboard" class="cursor-pointer rounded-lg flex items-center justify-center gap-2 px-2 py-2">
              <div class="flex items-center justify-center ">
                <i class="fa-solid fa-box-open"></i>
              </div>
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li class="hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg transition duration-200">
            <RouterLink to="/profile" class="cursor-pointer rounded-lg flex items-center justify-center gap-2 px-2 py-2">
              <div class="flex items-center justify-center ">
                <i class="fa-regular fa-user"></i>
              </div>
              <span>Profil</span>
            </RouterLink>
          </li>
          <li class="hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg transition duration-200">
            <RouterLink to="/settings" class="cursor-pointer rounded-lg flex items-center justify-center gap-2 px-2 py-2">
              <div class="flex items-center justify-center ">
                <i class="fa-solid fa-gear"></i>
              </div>
              <span>Einstellungen</span>
            </RouterLink>
          </li>
          <li class="group hover:text-[var(--primary-color)] rounded-lg transition duration-200">
            <button @click="onLogout" class="group-hover:border-[var(--primary-color)] cursor-pointer rounded-lg border border-gray-200 flex items-center justify-center gap-2 px-2 py-2">
              <div class="flex items-center justify-center ">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
              <span>Abmelden</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  .router-link-exact-active:not(.no-link-active){
    color: var(--primary-color);
    background-color: var(--primary-color-light);
  }

  .active-burger-menu{
    display: block;
  }
</style>
