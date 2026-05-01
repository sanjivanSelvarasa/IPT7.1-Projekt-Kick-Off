<script lang="ts" setup>
import NavApp from "@/components/layout/NavApp.vue";
import CardDashboard from "@/components/ui/CardDashboard.vue";
import {computed, onMounted, ref} from "vue";
import {usePortfolioStore} from "@/stores/portfolioStore.ts";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/authStore.ts";
import router from "@/router";

const portfolioStore = usePortfolioStore();

onMounted(async () => {
  try{
    await portfolioStore.getPortfolio()
  }catch{}
})

const searchText = ref<string>("");
const noResults = computed(() => {
  return searchText.value.length > 0 && updatedPortfolios.value?.length === 0
})

const updatedPortfolios = computed(() => {
  return portfolioStore.portfolios?.filter(t => t.title.toLowerCase().includes(searchText.value.toLowerCase()) || t.description.toLowerCase().includes(searchText.value.toLowerCase()));
})


// language
const { t } = useI18n();

const tl = (key: string) => t(`dashboard.${key}`);

// logout
const authStore = useAuthStore();
async function onLogout() {
  await authStore.logout();
  await router.push("/login");
}
</script>

<template>
  <div class="overflow-x-hidden bg-[var(--background-color)] w-full min-h-[100vh] h-full absolute top-0 left-0">
    <div class="absolute w-full h-full grid-bg -z-99"></div>
    <NavApp @logout="onLogout"></NavApp>
    <header class="w-full flex items-center justify-between gap-5 mt-40 max-w-[1200px] xl:mx-auto px-5">
      <div class="flex flex-col items-start justify-between gap-2">
        <span class="uppercase text-[var(--primary-color)]">{{ tl("start.Preview") }}</span>
        <h1>{{ tl("start.title") }}</h1>
        <span class="text-[var(--text-color-light)]">{{ tl("start.description") }}</span>
      </div>

      <div>
        <button class="sm:flex hidden text-nowrap hover:scale-101 hover:-translate-y-[1px] transition duration-100 items-center justify-center gap-2 px-4 py-2 bg-[var(--primary-color)] rounded-lg shadow-lg text-[var(--text-color-white)] cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-plus"></i>
          </div>
          <span>{{ tl("start.create-button") }}</span>
        </button>
      </div>
    </header>

    <main class="w-full flex flex-col items-start justify-center gap-10 mt-10 max-w-[1200px] xl:mx-auto px-5">
      <div class="flex-wrap flex items-center justify-start gap-5 w-full">
        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-gray-500"></div>
            <span class="text-sm text-[var(--text-color-light)]">{{ tl("start.listed-portfolios-one") }} <span class="text-[var(--text-color)] font-bold ml-2">{{ portfolioStore.portfolios?.length }}</span> </span>
          </span>
        </div>

        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-[var(--accent-color)]"></div>
            <span class="text-sm text-[var(--text-color-light)]">{{ tl("start.listed-portfolios-two") }} <span class="text-[var(--text-color)] font-bold ml-2">{{ portfolioStore.portfolios?.filter(t => t.visibility === 'sdasdasds').length }}</span> </span>
          </span>
        </div>

        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-orange-400"></div>
            <span class="text-sm text-[var(--text-color-light)]">{{ tl("start.listed-portfolios-three") }} <span class="text-[var(--text-color)] font-bold ml-2">{{ portfolioStore.portfolios?.filter(t => t.visibility === 'private').length }}</span> </span>
          </span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-4 w-full md:w-fit">
        <div class="hover:border-[var(--primary-color)] transition duration-150 md:w-[450px] w-full border border-gray-200 cursor-pointer flex items-center justify-center gap-4 px-4 py-2 rounded-lg bg-[var(--surface-color)] shadow-lg">
          <div class="text-[var(--text-color-light)] flex items-center justify-center">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <input v-model="searchText" class="outline-none w-full" type="search" :placeholder=" tl('start.bars-and-sort-functions.search-bar') " />
        </div>

        <div class="md:flex hidden">
          <select class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] shadow-lg px-4 py-2 text-[var(--text-color-light)] outline-none border border-gray-200 rounded-lg bg-[var(--surface-color)] cursor-pointer" name="cars" id="cars">
            <option value="all">{{ tl("start.bars-and-sort-functions.status-sorter-standard") }}</option>
            <option value="public">{{ tl("start.bars-and-sort-functions.status-sorter-published") }}</option>
            <option value="private">{{ tl("start.bars-and-sort-functions.status-sorter-draft") }}</option>
          </select>
        </div>

        <div class="md:flex hidden hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] items-center justify-center gap-2 shadow-lg px-4 py-2 text-[var(--text-color-light)] outline-none border border-gray-200 rounded-lg bg-[var(--surface-color)] cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-sort"></i>
          </div>
          <span>{{ tl("start.bars-and-sort-functions.sort") }}</span>
        </div>
      </div>

      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-[auto_1fr] gap-4 w-full mb-8">
        <CardDashboard v-for="portfolio in updatedPortfolios" :key="portfolio.id" :portfolio="portfolio"></CardDashboard>

        <!-- create project-->
        <div v-if="!noResults" class="select-none group hover:border-[var(--primary-color)] cursor-pointer transition duration-150 relative bg-transparent w-full h-[350px] aspect-square rounded-2xl overflow-hidden border-3 border-gray-200 border-dashed">
          <div class="flex flex-col items-center justify-center h-full w-full gap-3">
            <div class="group-hover:border-[var(--primary-color)] group-hover:text-[var(--primary-color)] transition duration-150 flex items-center justify-center w-[45px] h-[45px] border border-gray-200 rounded-lg text-[var(--text-color-light)]">
              <i class="fa-solid fa-plus"></i>
            </div>
            <span class="font-semibold text-gray-600">{{ tl("start.new-card.description") }}</span>
            <span class="text-[var(--text-color-light)]">{{ tl("start.new-card.click-effect") }}</span>
          </div>
        </div>

        <div v-if="noResults" class="w-full h-full flex items-center justify-center">
          <div class="flex items-center justify-center gap-4 px-8 py-4 shadow-lg bg-[var(--surface-color)] text-[var(--text-color)] h-fit w-fit rounded-xl">
            <div>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <span>Keine Ergebnisse gefunden</span>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
