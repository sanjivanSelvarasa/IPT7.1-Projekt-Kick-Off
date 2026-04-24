<script setup lang="ts">
import Logo from "@/components/ui/Logo.vue";
</script>

<template>
  <div class="z-999 fixed top-0 left-0 w-full bg-[var(--surface-color)] shadow-sm h-[65px] flex items-center justify-center">
    <div class="flex items-center justify-between w-[1400px] px-4 py-2 h-full">
      <!-- Logo-->
      <Logo class="no-link-active" link="/dashboard"></Logo>

      <!-- Section Links-->
      <div class="h-full flex items-center">
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
            <button class="group-hover:border-[var(--primary-color)] cursor-pointer rounded-lg border border-gray-200 flex items-center justify-center gap-2 px-2 py-2">
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
</style>
