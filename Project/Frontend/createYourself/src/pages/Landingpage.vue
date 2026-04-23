<script lang="ts" setup>

import NavHome from "@/components/layout/NavHome.vue";
import Footer from "@/components/ui/Footer.vue";
</script>

<template>
  <NavHome></NavHome>

  <header class="relative w-full h-[100vh] flex items-center justify-center gap-10">
    <div class="absolute top-0 left-0 grid-bg w-full h-full -z-999"></div>
    <div class="absolute top-0 left-0 header-bg w-full h-full -z-999"></div>
    <div class="flex flex-col items-start justify-between gap-4 bg-">
      <!-- Title-->
      <div class="flex flex-col items-start justify-between font-extrabold text-[55px]">
        <span class="leading-7">Dein Portfolio.</span>
        <span class="bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">Deine Identität.</span>
      </div>
      <!-- Hero Text-->
      <div class="text-[var(--text-color-light)] max-w-[550px] text-wrap">
        <p>Erstelle dein Online-Portfolio mit einem modularen Editor. Inhalte können strukturiert aufgebaut, bearbeitet und als persönliche Seite dargestellt werden.</p>
      </div>

      <!-- CTA Buttons -->
      <div class="flex items-center justify-center gap-4 ">
        <button class="cursor-pointer flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--primary-color)] text-[var(--text-color-white)] font-semibold">
          <div class="flex items-center justify-center text-[var(--text-color-white)]">
            <i class="fa-solid fa-plus"></i>
          </div>
          <span>Jetzt starten</span>
        </button>
        <button class="cursor-pointer gap-2 px-5 py-3 rounded-lg bg-transparent text-[var(--text-color-light)] font-semibold border border-gray-200">
          <span>Anmelden</span>
        </button>
      </div>

      <!-- divider-->
      <div class="w-full h-[1px] rounded-full bg-gray-200"></div>

      <!-- bullet points-->
      <div class="flex items-center justify-center gap-4">
        <div class="flex flex-col items-start justify-between gap-1">
          <span class="font-semibold">Modular</span>
          <span class="text-xs text-[var(--text-color-light)]">Portfolio in Blöcken aufbauen</span>
        </div>

        <div class="h-[35px] w-[1px] bg-gray-200"></div>

        <div class="flex flex-col items-start justify-between gap-1">
          <span class="font-semibold">Flexibel</span>
          <span class="text-xs text-[var(--text-color-light)]">Inhalte selbst anordnen</span>
        </div>

        <div class="h-[35px] w-[1px] bg-gray-200"></div>

        <div class="flex flex-col items-start justify-between gap-1">
          <span class="font-semibold">Persönlich</span>
          <span class="text-xs text-[var(--text-color-light)]">Eigene Seite gestalten</span>
        </div>
      </div>
    </div>

    <div class="w-[550px] h-[550px] rounded-2xl border border-gray-200 bg-[var(--surface-color)]"></div>
  </header>

  <section>

  </section>

  <Footer></Footer>
</template>

<style scoped>
  .grid-bg{
    background-color: #e5e5f7;
    opacity: .05;
    background-image:  linear-gradient(var(--primary-color) 1px, transparent 1px), linear-gradient(to right, var(--primary-color) 1px, var(--background-color) 1px);
    background-size: 45px 45px;
  }

  .header-bg{
    background: linear-gradient(to bottom right, rgba(37, 99, 235, 0.12), transparent, rgba(124, 58, 237, 0.12))
  }
</style>
