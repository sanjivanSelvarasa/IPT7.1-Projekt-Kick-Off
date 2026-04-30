<script lang="ts" setup>
import NavApp from "@/components/layout/NavApp.vue";
import CardDashboard from "@/components/ui/CardDashboard.vue";
import {computed, onMounted, ref} from "vue";
import {usePortfolioStore} from "@/stores/portfolioStore.ts";

const portfolioStore = usePortfolioStore();

onMounted(async () => {
  try{
    await portfolioStore.getPortfolio()
  }catch{}
})

const searchText = ref<string>("");

const updatedPortfolios = computed(() => {
  return portfolioStore.portfolios?.filter(t => t.title.toLowerCase().includes(searchText.value.toLowerCase()) || t.description.toLowerCase().includes(searchText.value.toLowerCase()));
})
</script>

<template>
  <div class="bg-[var(--background-color)] w-full min-h-[100vh] h-full absolute top-0 left-0">
    <div class="absolute w-full h-full grid-bg -z-99"></div>
    <NavApp></NavApp>
    <header class="w-full flex items-center justify-between gap-5 mt-40 max-w-[1200px] mx-auto">
      <div class="flex flex-col items-start justify-between gap-2">
        <span class="uppercase text-[var(--primary-color)]">Übersicht</span>
        <h1>Meine Portfolios</h1>
        <span class="text-[var(--text-color-light)]">Verwalte, bearbeite und veröffentliche deine Portfolios</span>
      </div>

      <div>
        <button class="hover:scale-101 hover:-translate-y-[1px] transition duration-100 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary-color)] rounded-lg shadow-lg text-[var(--text-color-white)] cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-plus"></i>
          </div>
          <span>Neues Portfolio</span>
        </button>
      </div>
    </header>

    <main class="w-full flex flex-col items-start justify-center gap-10 mt-10 max-w-[1200px] mx-auto">
      <div class="flex items-center justify-start gap-5 w-full">
        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-gray-500"></div>
            <span class="text-sm text-[var(--text-color-light)]">Gesamt <span class="text-[var(--text-color)] font-bold ml-2">{{ portfolioStore.portfolios?.length }}</span> </span>
          </span>
        </div>

        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-[var(--accent-color)]"></div>
            <span class="text-sm text-[var(--text-color-light)]">Veröffentlicht <span class="text-[var(--text-color)] font-bold ml-2">{{ portfolioStore.portfolios?.filter(t => t.visibility === 'sdasdasds').length }}</span> </span>
          </span>
        </div>

        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-orange-400"></div>
            <span class="text-sm text-[var(--text-color-light)]">Entwurf <span class="text-[var(--text-color)] font-bold ml-2">{{ portfolioStore.portfolios?.filter(t => t.visibility === 'private').length }}</span> </span>
          </span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-4">
        <div class="hover:border-[var(--primary-color)] transition duration-150 w-[450px] border border-gray-200 cursor-pointer flex items-center justify-center gap-4 px-4 py-2 rounded-lg bg-[var(--surface-color)] shadow-lg">
          <div class="text-[var(--text-color-light)] flex items-center justify-center">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <input v-model="searchText" class="outline-none w-full" type="search" placeholder="Portfolio suchen ..." />
        </div>

        <div>
          <select class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] shadow-lg px-4 py-2 text-[var(--text-color-light)] outline-none border border-gray-200 rounded-lg bg-[var(--surface-color)] cursor-pointer" name="cars" id="cars">
            <option value="all">Alle Status</option>
            <option value="public">Veröffentlicht</option>
            <option value="private">Entwurf</option>
          </select>
        </div>

        <div class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] flex items-center justify-center gap-2 shadow-lg px-4 py-2 text-[var(--text-color-light)] outline-none border border-gray-200 rounded-lg bg-[var(--surface-color)] cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-sort"></i>
          </div>
          <span>Sortieren</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 grid-rows-[auto_1fr] w-full mb-8">
        <CardDashboard v-for="portfolio in updatedPortfolios" :key="portfolio.id" :portfolio="portfolio"></CardDashboard>

        <!-- create project-->
        <div class="select-none group hover:border-[var(--primary-color)] cursor-pointer transition duration-150 relative bg-transparent w-full h-[350px] aspect-square rounded-2xl overflow-hidden border-3 border-gray-200 border-dashed">
          <div class="flex flex-col items-center justify-center h-full w-full gap-3">
            <div class="group-hover:border-[var(--primary-color)] group-hover:text-[var(--primary-color)] transition duration-150 flex items-center justify-center w-[45px] h-[45px] border border-gray-200 rounded-lg text-[var(--text-color-light)]">
              <i class="fa-solid fa-plus"></i>
            </div>
            <span class="font-semibold text-gray-600">Neues Portfolio erstellen</span>
            <span class="text-[var(--text-color-light)]">Klicken zum Starten</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
