<script lang="ts" setup>

</script>

<template>
  <div class="group hover:shadow-lg transition duration-150 relative bg-[var(--surface-color)] w-full h-[350px] aspect-square rounded-2xl overflow-hidden border border-gray-200">

    <div v-if="true" class="absolute top-0 right-0 m-3 rounded-full flex items-center justify-center gap-2 text-sm bg-green-50 text-[var(--accent-color)] border border-green-300 px-3 py-1">
      <div class="relative flex items-center justify-center text-[6px]">
        <div class="absolute top-0 left-0 w-full h-full animate-slow-ping bg-green-300 rounded-full"></div>
        <i class="fa-solid fa-circle z-1"></i>
      </div>
      <span>Live</span>
    </div>

    <div v-if="false" class="absolute top-0 right-0 m-3 rounded-full flex items-center justify-center gap-2 text-sm bg-yellow-50 text-yellow-600 border border-yellow-400 px-3 py-1">
      <span>Entwurf</span>
    </div>

    <div class="absolute flex items-start justify-center">
      <div class="dropdown-trigger group-hover:opacity-100 opacity-0 transition duration-100 cursor-pointer top-0 left-0 m-5 mr-0 p-3 w-fit bg-[var(--surface-color)] border border-gray-200 rounded-lg">
        <div class="flex items-center justify-center">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>

      <div class="dropdown-menu hidden mt-5 p-3 flex-col items-start justify-start text-sm font-semibold bg-[var(--surface-color)] rounded-lg border border-gray-200">
        <span class="hover:bg-[var(--background-color)] w-full transition duration-150 cursor-pointer rounded-lg px-2 py-1">Umbenennen</span>
        <span class="hover:bg-red-50 hover:text-red-500 hover:border-red-500 border border-transparent w-full transition duration-150 cursor-pointer rounded-lg px-2 py-1">Löschen</span>
      </div>
    </div>

    <div class="absolute top-0 left-0 w-full h-1 bg-[var(--primary-color)]"></div>

    <div class="dotted-bg w-full h-[150px] flex items-center justify-center border border-transparent border-b-gray-200">
      <div class="flex items-center justify-center w-[45px] h-[45px] bg-[var(--surface-color)] text-[var(--primary-color)] shadow-lg rounded-lg">
        <i class="fa-solid fa-computer"></i>
      </div>
    </div>

    <div class="flex flex-col items-start justify-center gap-1 px-4 py-4">
      <span class="font-semibold">Design Portfolio 2026</span>
      <span class="text-[var(--text-color-light)] text-sm">UI / UX-Projekte, Case Studies und visuelle Arbeiten aus zwei Jahren freiberuflicher ...</span>
    </div>

    <div class="w-full h-[1px] bg-gray-200 my-3"></div>

    <div class="flex items-center justify-start text-nowrap text-xs">
      <div class="flex items-center justify-start gap-2 px-4 text-[var(--text-color-light)]">
        <div class="flex items-center justify-center">
          <i class="fa-regular fa-calendar"></i>
        </div>
        <span>Geändert: 19. Apr. 2026</span>
      </div>

      <div class="flex items-center justify-start gap-2 text-[var(--text-color-light)]">
        <div class="flex items-center justify-center">
          <i class="fa-regular fa-eye"></i>
        </div>
        <span>845 Aufrufe</span>
      </div>
    </div>

    <div class="flex items-center justify-start">
      <button class="hover:scale-101 hover:bg-blue-100 transition duration-100 cursor-pointer mt-3 flex items-center justify-center gap-2 text-[var(--primary-color)] text-sm ml-4 px-3 py-1 bg-[var(--primary-color-light)] border border-blue-200 rounded-lg">
        <div class="flex items-center justify-center">
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
        <span>Bearbeiten</span>
      </button>

      <button v-if="false" class="hover:scale-101 hover:bg-green-100 transition duration-100 cursor-pointer mt-3 flex items-center justify-center gap-2 text-[var(--accent-color)] text-sm ml-4 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center justify-center">
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
        </div>
        <span>Veröffentlichen</span>
      </button>

      <button v-if="true" class="hover:scale-101 hover:bg-yellow-100 transition duration-100 cursor-pointer mt-3 flex items-center justify-center gap-2 text-yellow-600 text-sm ml-4 px-3 py-1 bg-yellow-50 border border-yellow-400 rounded-lg">
        <div class="flex items-center justify-center">
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
        </div>
        <span>Depublizieren</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .dotted-bg {
    background-image: radial-gradient(var(--primary-color) 1px, var(--primary-color-light) 0);
    background-size: 20px 20px;
  }

  .dropdown-trigger:hover + .dropdown-menu,
  .dropdown-menu:hover{
    display: flex;
  }

  .animate-slow-ping{
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
</style>
