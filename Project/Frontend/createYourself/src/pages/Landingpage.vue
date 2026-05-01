<script lang="ts" setup>
import NavHome from "@/components/layout/NavHome.vue";
import Footer from "@/components/layout/Footer.vue";
import FactsBox from "@/components/ui/FactsBox.vue";
import SectionTitle from "@/components/ui/SectionTitle.vue";
import {useI18n} from "vue-i18n";

const { t, locale} = useI18n();

function changeLanguage(lang: string) {
  locale.value = lang
  localStorage.setItem("language", lang)
}

const tl = (key: string) => t(`landingpage.${key}`)

function changeLang(lang: string) {
  locale.value = lang
  localStorage.setItem("lang", lang)
}
</script>

<template>
  <NavHome @lang="changeLang" :lang-selected="locale"></NavHome>

  <main class="overflow-x-hidden">
    <header id="header" class="relative w-full h-[100vh]">
      <div class="absolute top-0 left-0 grid-bg w-full h-full -z-999"></div>
      <div class="absolute top-0 left-0 header-bg w-full h-full -z-999"></div>
      <div class="flex items-center justify-between gap-10 h-full max-w-[1200px] mx-auto">
      <div class="flex flex-col items-start justify-between gap-4 bg-">
        <!-- Title-->
        <div class="flex flex-col items-start justify-between font-extrabold text-[55px]">
          <span class="leading-7">{{ tl("hero.title") }}</span>
          <div class="overflow-hidden">
            <div class="hero-text flex flex-col items-start h-[80px] ">
              <span class="h-[80px] bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">{{ tl("hero.title-sub-one") }}</span>
              <span class="h-[80px] bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">{{ tl("hero.title-sub-two") }}</span>
              <span class="h-[80px] bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">{{ tl("hero.title-sub-three") }}</span>
            </div>
          </div>
        </div>
        <!-- Hero Text-->
        <div class="text-[var(--text-color-light)] max-w-[550px] text-wrap">
          <p>{{ tl("hero.description") }}</p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex items-center justify-center gap-4 ">
          <RouterLink to="/login" class="hover:-translate-y-0.5 hover:scale-100.5 hover:shadow-lg hover:bg-blue-600 duration-150 transition cursor-pointer flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--primary-color)] text-[var(--text-color-white)] font-semibold">
            <div class="flex items-center justify-center text-[var(--text-color-white)]">
              <i class="fa-solid fa-plus"></i>
            </div>
            <span>{{ tl("hero.cta-one") }}</span>
          </RouterLink>
          <RouterLink to="/login" class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] duration-150 transition cursor-pointer gap-2 px-5 py-3 rounded-lg bg-[var(--surface-color)] text-[var(--text-color-light)] font-semibold border border-gray-200">
            <span>{{ tl("hero.cta-two") }}</span>
          </RouterLink>
        </div>

        <!-- divider-->
        <div class="w-full h-[1px] rounded-full bg-gray-200"></div>

        <!-- bullet points-->
        <div class="flex items-center justify-center gap-4">
          <div class="flex flex-col items-start justify-between gap-1">
            <span class="font-semibold">{{ tl("hero.bp-one.title") }}</span>
            <span class="text-xs text-[var(--text-color-light)]">{{ tl("hero.bp-one.description") }}</span>
          </div>

          <div class="h-[35px] w-[1px] bg-gray-200"></div>

          <div class="flex flex-col items-start justify-between gap-1">
            <span class="font-semibold">{{ tl("hero.bp-two.title") }}</span>
            <span class="text-xs text-[var(--text-color-light)]">{{ tl("hero.bp-two.description") }}</span>
          </div>

          <div class="h-[35px] w-[1px] bg-gray-200"></div>

          <div class="flex flex-col items-start justify-between gap-1">
            <span class="font-semibold">{{ tl("hero.bp-three.title") }}</span>
            <span class="text-xs text-[var(--text-color-light)]">{{ tl("hero.bp-two.description") }}</span>
          </div>
        </div>
      </div>

      <div class="select-none relative w-[550px] h-[550px] rounded-2xl border border-gray-200 bg-[var(--surface-color)]">

        <div class="hover:border-[var(--primary-color)] hover:scale-102 cursor-pointer transition duration-100 levitate absolute flex flex-col items-start justify-center top-0 -left-50 m-4 px-4 py-2 bg-[var(--surface-color)] border border-gray-200 rounded-lg text-[var(--text-color-light)]">
          <span class="text-sm">{{ tl("hero.fact-one.title") }}</span>
          <span class="text-xl font-bold bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-transparent bg-clip-text">{{ tl("hero.fact-one.value") }}</span>
        </div>

        <div class="hover:border-[var(--primary-color)] hover:scale-102 cursor-pointer transition duration-100 z-1 levitate absolute flex flex-col items-start justify-center bottom-0 -right-25 m-4 px-4 py-2 bg-[var(--surface-color)] border border-gray-200 rounded-lg text-[var(--text-color-light)]">
          <span class="text-sm">{{ tl("hero.fact-two.title") }}</span>

          <div class="flex items-center justify-center gap-2">
            <div class="relative flex items-center justify-center text-[8px] text-green-400">
              <div class="absolute w-[8px] h-[8px] translate-x-0.25 animate-ping bg-green-400 rounded-full"></div>
              <i class="fa-solid fa-circle"></i>
            </div>
            <span class="text-xl font-bold bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-transparent bg-clip-text">{{ tl("hero.fact-two.value") }}</span>
          </div>
        </div>

        <div class="hover:border-[var(--primary-color)] hover:scale-102 cursor-pointer transition duration-100 z-1 levitate absolute flex flex-col items-start justify-center top-40 -right-45 m-4 px-4 py-2 bg-[var(--surface-color)] border border-gray-200 rounded-lg text-[var(--text-color-light)]">
          <span class="text-sm">{{ tl("hero.fact-three.title") }}</span>
          <span class="text-xl font-bold bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-transparent bg-clip-text">{{ tl("hero.fact-three.value") }}</span>
        </div>

        <div class="flex items-center justify-start px-4 py-4 bg-gray-50">
          <div class="flex items-center justify-center gap-2">
            <div class="w-[10px] h-[10px] rounded-full bg-red-500"></div>
            <div class="w-[10px] h-[10px] rounded-full bg-yellow-400"></div>
            <div class="w-[10px] h-[10px] rounded-full bg-green-500"></div>
          </div>
        </div>

        <div class="px-4 py-6">
          <div class="h-[100px] w-[100px] rounded-full bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)]"></div>

          <div class="mt-3 flex flex-col items-start justify-center gap-2">
            <div class="animate-pulse w-full h-[20px] rounded-sm bg-gray-200"></div>
            <div class="animate-pulse w-[75%] h-[20px] rounded-sm bg-gray-200"></div>
            <div class="animate-pulse w-[90%] h-[20px] rounded-sm bg-gray-200"></div>
          </div>

          <div class="mt-3">
            <span class="uppercase font-bold text-[var(--text-color-light)]">{{ tl("hero.visual-one") }}</span>

            <div class="mt-2 flex items-center justify-start gap-2 flex-wrap">
              <button class="cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-100 px-3 py-1 border border-gray-200 text-[var(--text-color-light)] rounded-full">UI Design</button>
              <button class="cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-100 px-3 py-1 border border-gray-200 text-[var(--text-color-light)] rounded-full">Figma</button>
              <button class="cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-100 px-3 py-1 border border-gray-200 text-[var(--text-color-light)] rounded-full">React</button>
              <button class="cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-100 px-3 py-1 border border-gray-200 text-[var(--text-color-light)] rounded-full">TypeScript</button>
              <button class="cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-100 px-3 py-1 border border-gray-200 text-[var(--text-color-light)] rounded-full">Vue</button>
            </div>
          </div>

          <div class="mt-3">
            <span class="uppercase font-bold text-[var(--text-color-light)]">{{ tl("hero.visual-two") }}</span>

            <div class="mt-2 flex items-center justify-start gap-2 flex-wrap">
              <div class="flex items-center justify-start gap-2 w-full">
                <div class="w-[8px] h-[8px] rounded-full bg-[var(--primary-color)]"></div>
                <div class="animate-pulse w-[90%] h-[20px] rounded-sm bg-gray-200"></div>
              </div>

              <div class="w-full h-[1px] bg-gray-100"></div>

              <div class="flex items-center justify-start gap-2 w-full">
                <div class="w-[8px] h-[8px] rounded-full bg-[var(--primary-color)]"></div>
                <div class="animate-pulse w-[90%] h-[20px] rounded-sm bg-gray-200"></div>
              </div>

              <div class="w-full h-[1px] bg-gray-100"></div>

              <div class="flex items-center justify-start gap-2 w-full">
                <div class="w-[8px] h-[8px] rounded-full bg-[var(--primary-color)]"></div>
                <div class="animate-pulse w-[90%] h-[20px] rounded-sm bg-gray-200"></div>
              </div>

              <div class="w-full h-[1px] bg-gray-100"></div>

              <div class="flex items-center justify-start gap-2 w-full">
                <div class="w-[8px] h-[8px] rounded-full bg-[var(--primary-color)]"></div>
                <div class="animate-pulse w-[90%] h-[20px] rounded-sm bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </header>

    <section id="function" class="max-w-[1200px] flex flex-col items-center justify-center gap-4">
      <SectionTitle svg="fa-regular fa-star" :title="tl('function.sectionTitle.title')" :tag-text="tl('function.sectionTitle.tag')" :description="tl('function.sectionTitle.description')"></SectionTitle>

      <div class="w-full max-w-[1400px] px-4 py-2 grid grid-cols-2 gap-4">
        <FactsBox svg="fa-solid fa-boxes-stacked" svg-color="var(--primary-color)" svg-bg-color="var(--primary-color-light)" :title="tl('function.facts-box-one.title')" :description="tl('function.facts-box-one.description')" :fact-one="tl('function.facts-box-one.fact-one')" :fact-two="tl('function.facts-box-one.fact-two')" :fact-three="tl('function.facts-box-one.fact-three')"></FactsBox>
        <FactsBox svg="fa-regular fa-circle-check" svg-color="var(--secondary-color)" svg-bg-color="var(--secondary-color-light)" :title="tl('function.facts-box-two.title')" :description="tl('function.facts-box-two.description')" :fact-one="tl('function.facts-box-two.fact-one')" :fact-two="tl('function.facts-box-two.fact-two')" :fact-three="tl('function.facts-box-two.fact-three')"></FactsBox>
        <FactsBox svg="fa-regular fa-pen-to-square" svg-color="oklch(76.5% 0.177 163.223)" svg-bg-color="oklch(98.2% 0.018 155.826)" :title="tl('function.facts-box-three.title')" :description="tl('function.facts-box-three.description')" :fact-one="tl('function.facts-box-three.fact-one')" :fact-two="tl('function.facts-box-three.fact-two')" :fact-three="tl('function.facts-box-three.fact-three')"></FactsBox>
        <FactsBox svg="fa-regular fa-clock" svg-color="oklch(83.7% 0.128 66.29)" svg-bg-color="oklch(98% 0.016 73.684)" :title="tl('function.facts-box-four.title')" :description="tl('function.facts-box-four.description')" :fact-one="tl('function.facts-box-four.fact-one')" :fact-two="tl('function.facts-box-four.fact-two')" :fact-three="tl('function.facts-box-four.fact-three')"></FactsBox>
      </div>
    </section>

    <section id="editor" class="flex flex-col justify-center items-center bg-[var(--background-color)]">
      <div class="max-w-[1200px] w-full flex flex-col items-center justify-center gap-5">
        <SectionTitle svg="fa-regular fa-pen-to-square" :title="tl('editor.sectionTitle.title')" :tag-text="tl('editor.sectionTitle.tag')" :description="tl('editor.sectionTitle.description')"></SectionTitle>
        <div class="flex items-center justify-between w-full gap-8">
          <div class="flex flex-col gap-3">
            <div class="hover:bg-[var(--surface-color)] hover:border-gray-300 hover:shadow-lg duration-150 transition cursor-pointer flex items-start justify-center gap-4 font-bold max-w-[600px] px-4 py-4 rounded-2xl border border-transparent">
              <div class="flex items-center justify-center rounded-lg border min-w-[40px] min-h-[40px] text-[var(--primary-color)] bg-[var(--primary-color-light)] border-blue-200">
                <i class="fa-solid fa-1"></i>
              </div>
              <div class="flex flex-col items-start justify-center gap-1">
                <span class="font-bold">{{ tl("editor.fact-one.title") }}</span>
                <p class="text-[var(--text-color-light)] text-sm font-normal">{{ tl("editor.fact-one.description") }}</p>
              </div>
            </div>

            <div class="hover:bg-[var(--surface-color)] hover:border-gray-200 hover:shadow-lg duration-150 transition cursor-pointer flex items-start justify-center gap-4 font-bold max-w-[600px] px-4 py-4 rounded-2xl border border-transparent">
              <div class="flex items-center justify-center rounded-lg border min-w-[40px] min-h-[40px] text-[var(--primary-color)] bg-[var(--primary-color-light)] border-blue-200">
                <i class="fa-solid fa-2"></i>
              </div>
              <div class="flex flex-col items-start justify-center gap-1">
                <span class="font-bold">{{ tl("editor.fact-two.title") }}</span>
                <p class="text-[var(--text-color-light)] text-sm font-normal">{{ tl("editor.fact-two.description") }}</p>
              </div>
            </div>

            <div class="hover:bg-[var(--surface-color)] hover:border-gray-200 hover:shadow-lg duration-150 transition cursor-pointer flex items-start justify-center gap-4 font-bold max-w-[600px] px-4 py-4 rounded-2xl border border-transparent">
              <div class="flex items-center justify-center rounded-lg border min-w-[40px] min-h-[40px] text-[var(--primary-color)] bg-[var(--primary-color-light)] border-blue-200">
                <i class="fa-solid fa-3"></i>
              </div>
              <div class="flex flex-col items-start justify-center gap-1">
                <span class="font-bold">{{ tl("editor.fact-three.title") }}</span>
                <p class="text-[var(--text-color-light)] text-sm font-normal">{{ tl("editor.fact-three.description") }}</p>
              </div>
            </div>

            <div class="hover:bg-[var(--surface-color)] hover:border-gray-200 hover:shadow-lg duration-150 transition cursor-pointer flex items-start justify-center gap-4 font-bold max-w-[600px] px-4 py-4 rounded-2xl border border-transparent">
              <div class="flex items-center justify-center rounded-lg border min-w-[40px] min-h-[40px] text-[var(--primary-color)] bg-[var(--primary-color-light)] border-blue-200">
                <i class="fa-solid fa-4"></i>
              </div>
              <div class="flex flex-col items-start justify-center gap-1">
                <span class="font-bold">{{ tl("editor.fact-four.title") }}</span>
                <p class="text-[var(--text-color-light)] text-sm font-normal">{{ tl("editor.fact-four.description") }}</p>
              </div>
            </div>
          </div>
          <div class="select-none w-[600px] h-[450px] bg-[var(--surface-color)] rounded-[30px] shadow-lg border-2 overflow-hidden border-gray-200">
            <div class="flex items-center justify-between px-4 py-2 w-full bg-gray-50">
              <span class="font-bold">{{ tl("editor.visual.title") }}</span>
              <div class="flex items-center justify-center text-sm font-bold text-[var(--text-color-light)] gap-2">
                <button class="cursor-pointer px-3 py-1 bg-[var(--primary-color)] rounded-lg text-[var(--text-color-white)]">{{ tl("editor.visual.nav-one") }}</button>
                <button class="cursor-pointer hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-100 border border-transparent px-3 py-1 rounded-lg">{{ tl("editor.visual.nav-two") }}</button>
                <button class="cursor-pointer hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-100 border border-transparent px-3 py-1 rounded-lg">{{ tl("editor.visual.nav-three") }}</button>
              </div>
            </div>

            <div class="px-3 grid grid-rows-4 gap-3 mt-4">
              <div class="cursor-pointer flex items-center h-full justify-start gap-4 px-4 py-4 w-full border border-gray-200 rounded-lg">
                <div class="flex items-center justify-start gap-4 w-full">
                  <div class="flex items-center justify-center w-[30px] h-[30px] bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded-lg">
                    <i class="fa-solid fa-align-left"></i>
                  </div>
                  <div class="flex flex-col items-start justify-center">
                    <span class="text-sm font-semibold">{{ tl("editor.visual.box-one.title") }}</span>
                    <span class="text-xs text-[var(--text-color-light)]">{{ tl("editor.visual.box-one.subtitle") }}</span>
                  </div>
                </div>

                <div class="flex items-center justify-center w-[20px] h-[30px] text-[var(--text-color-light)]">
                  <i class="fa-solid fa-align-justify"></i>
                </div>
              </div>

              <div class="cursor-pointer flex items-center h-full justify-start gap-4 px-4 py-2 w-full border border-gray-200 rounded-lg">
                <div class="flex items-center justify-start gap-4 w-full">
                  <div class="flex items-center justify-center w-[30px] h-[30px] bg-[var(--secondary-color-light)] text-[var(--secondary-color)] rounded-lg">
                    <i class="fa-regular fa-user"></i>
                  </div>
                  <div class="flex flex-col items-start justify-center">
                    <span class="text-sm font-semibold">{{ tl("editor.visual.box-two.title") }}</span>
                    <span class="text-xs text-[var(--text-color-light)]">{{ tl("editor.visual.box-two.subtitle") }}</span>
                  </div>
                </div>

                <div class="flex items-center justify-center w-[20px] h-[30px] text-[var(--text-color-light)]">
                  <i class="fa-solid fa-align-justify"></i>
                </div>
              </div>

              <div class="cursor-pointer flex items-center h-full justify-start gap-4 px-4 py-2 w-full border border-gray-200 rounded-lg">
                <div class="flex items-center justify-start gap-4 w-full">
                  <div class="flex items-center justify-center w-[30px] h-[30px] bg-green-50 text-[var(--accent-color)] rounded-lg">
                    <i class="fa-regular fa-folder"></i>
                  </div>
                  <div class="flex flex-col items-start justify-center">
                    <span class="text-sm font-semibold">{{ tl("editor.visual.box-three.title") }}</span>
                    <span class="text-xs text-[var(--text-color-light)]">{{ tl("editor.visual.box-three.subtitle") }}</span>
                  </div>
                </div>

                <div class="flex items-center justify-center w-[20px] h-[30px] text-[var(--text-color-light)]">
                  <i class="fa-solid fa-align-justify"></i>
                </div>
              </div>

              <div class="cursor-pointer flex items-center h-full justify-start gap-4 px-4 py-2 w-full border border-gray-200 rounded-lg">
                <div class="flex items-center justify-start gap-4 w-full">
                  <div class="flex items-center justify-center w-[30px] h-[30px] bg-orange-50 text-orange-400 rounded-lg">
                    <i class="fa-solid fa-arrow-trend-up"></i>
                  </div>
                  <div class="flex flex-col items-start justify-center">
                    <span class="text-sm font-semibold">{{ tl("editor.visual.box-four.title") }}</span>
                    <span class="text-xs text-[var(--text-color-light)]">{{ tl("editor.visual.box-four.subtitle") }}</span>
                  </div>
                </div>

                <div class="flex items-center justify-center w-[20px] h-[30px] text-[var(--text-color-light)]">
                  <i class="fa-solid fa-align-justify"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="howWorks" class="max-w-[1200px]">
      <SectionTitle svg="fa-solid fa-check" :title="tl('howWorks.sectionTitle.title')" :tag-text="tl('howWorks.sectionTitle.tag')" :description="tl('howWorks.sectionTitle.description')"></SectionTitle>

      <div class="p-4">
        <div class="grid grid-cols-3 gap-4 mt-3 border rounded-[30px] py-8 px-8 border-gray-200">
          <div class="relative flex flex-col items-start justify-center gap-2 flex-wrap border pr-3 border-r-gray-200 border-transparent">
            <div class="flex items-center justify-center absolute -top-5 right-5 text-[50px] font-extrabold">
              <span class="bg-linear-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">01</span>
            </div>
            <div class="w-[45px] h-[45px] rounded-lg bg-[var(--primary-color-light)] text-[var(--primary-color)] flex items-center justify-center text-lg">
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </div>
            <span class="font-bold mt-3">{{ tl("howWorks.fact-one.title") }}</span>
            <span class="text-[var(--text-color-light)] text-sm text-wrap">{{ tl("howWorks.fact-one.description") }}</span>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)] mt-3">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-one.bp-one") }}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-one.bp-two") }}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-one.bp-three") }}</span>
            </div>
          </div>


          <div class="w-full relative flex flex-col items-start justify-center gap-2 flex-wrap pr-5 border-r-gray-200 border border-transparent">
            <div class="flex items-center justify-center absolute -top-5 right-5 text-[50px] font-extrabold">
              <span class="bg-linear-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">02</span>
            </div>
            <div class="w-[45px] h-[45px] rounded-lg bg-[var(--secondary-color-light)] text-[var(--secondary-color)] flex items-center justify-center text-lg">
              <i class="fa-solid fa-plus"></i>
            </div>
            <span class="font-bold mt-3">{{ tl("howWorks.fact-two.title") }}</span>
            <span class="text-[var(--text-color-light)] text-sm text-wrap">{{ tl("howWorks.fact-two.description") }}</span>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)] mt-3">
              <div class="text-[var(--secondary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-two.bp-one") }}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--secondary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-two.bp-two") }}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--secondary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-two.bp-three") }}</span>
            </div>
          </div>

          <div class="relative flex flex-col items-start justify-center gap-2 flex-wrap">
            <div class="flex items-center justify-center absolute -top-5 right-5 text-[50px] font-extrabold">
              <span class="bg-linear-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">03</span>
            </div>
            <div class="w-[45px] h-[45px] rounded-lg bg-green-100 text-[var(--accent-color)] flex items-center justify-center text-lg">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <span class="font-bold mt-3">{{ tl("howWorks.fact-three.title") }}</span>
            <span class="text-[var(--text-color-light)] text-sm text-wrap">{{ tl("howWorks.fact-three.description") }}</span>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)] mt-3">
              <div class="text-[var(--accent-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-three.bp-one") }}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--accent-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-three.bp-two") }}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--accent-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("howWorks.fact-three.bp-three") }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[var(--background-color)]">
      <div class="max-w-[1200px] p-4">
        <section-title svg="fa-regular fa-user" :title="tl('target.sectionTitle.title')" :tag-text="tl('target.sectionTitle.tag')" :description="tl('target.sectionTitle.description')"></section-title>

        <div class="grid grid-cols-3 gap-4">
          <div class="group hover:shadow-lg overflow-hidden relative transition duration-150 flex flex-col items-start justify-center gap-4 bg-[var(--surface-color)] p-8 border border-gray-200 rounded-2xl">

            <div class="group-hover:opacity-100 transition duration-150 opacity-0 absolute bottom-0 left-0 w-full h-0.75 bg-[var(--primary-color)]"></div>

            <div class="flex items-center justify-center w-[45px] h-[45px] rounded-lg text-[var(--primary-color)] bg-[var(--primary-color-light)]">
              <i class="fa-solid fa-briefcase"></i>
            </div>
            <div class="flex flex-col items-start justify-center gap-2">
              <span class="uppercase text-xs text-[var(--text-color-light)] font-semibold">{{ tl("target.fact-one.subtitle")}}</span>
              <span class="font-bold text-lg">{{ tl("target.fact-one.title")}}</span>
            </div>
            <div class="text-[var(--text-color-light)] text-sm text-wrap">
              <p>{{ tl("target.fact-one.description")}}</p>
            </div>

            <div class="w-full h-[1px] bg-gray-200"></div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)] mt-3">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-one.bp-one")}}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-one.bp-two")}}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-one.bp-three")}}</span>
            </div>
          </div>

          <div class="group hover:shadow-lg overflow-hidden relative transition duration-150 flex flex-col items-start justify-center gap-4 bg-[var(--surface-color)] p-8 border border-gray-200 rounded-2xl">

            <div class="group-hover:opacity-100 transition duration-150 opacity-0 absolute bottom-0 left-0 w-full h-0.75 bg-[var(--secondary-color)]"></div>

            <div class="flex items-center justify-center w-[45px] h-[45px] rounded-lg text-[var(--secondary-color)] bg-[var(--secondary-color-light)]">
              <i class="fa-solid fa-code"></i>
            </div>
            <div class="flex flex-col items-start justify-center gap-2">
              <span class="uppercase text-xs text-[var(--text-color-light)] font-semibold">{{ tl("target.fact-two.subtitle")}}</span>
              <span class="font-bold text-lg">{{ tl("target.fact-two.title")}}</span>
            </div>
            <div class="text-[var(--text-color-light)] text-sm text-wrap">
              <p>{{ tl("target.fact-two.description")}}</p>
            </div>

            <div class="w-full h-[1px] bg-gray-200"></div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)] mt-3">
              <div class="text-[var(--secondary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-two.bp-one")}}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--secondary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-two.bp-two")}}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--secondary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-two.bp-three")}}</span>
            </div>
          </div>

          <div class="group hover:shadow-lg overflow-hidden relative transition duration-150 flex flex-col items-start justify-center gap-4 bg-[var(--surface-color)] p-8 border border-gray-200 rounded-2xl">

            <div class="group-hover:opacity-100 transition duration-150 opacity-0 absolute bottom-0 left-0 w-full h-0.75 bg-[var(--accent-color)]"></div>

            <div class="flex items-center justify-center w-[45px] h-[45px] rounded-lg text-[var(--accent-color)] bg-green-100">
              <i class="fa-solid fa-brush"></i>
            </div>
            <div class="flex flex-col items-start justify-center gap-2">
              <span class="uppercase text-xs text-[var(--text-color-light)] font-semibold">{{ tl("target.fact-three.subtitle")}}</span>
              <span class="font-bold text-lg">{{ tl("target.fact-three.title")}}</span>
            </div>
            <div class="text-[var(--text-color-light)] text-sm text-wrap">
              <p>{{ tl("target.fact-three.description")}}</p>
            </div>

            <div class="w-full h-[1px] bg-gray-200"></div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)] mt-3">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-three.bp-one")}}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-three.bp-two")}}</span>
            </div>

            <div class="flex gap-2 text-xs text-[var(--text-color-light)]">
              <div class="text-[var(--primary-color)] flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span class="">{{ tl("target.fact-three.bp-three")}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="public">
      <div class="flex items-start justify-between gap-8 w-[1200px]">
        <div class="select-none w-[600px] h-[450px] bg-[var(--surface-color)] rounded-[30px] shadow-lg text-sm overflow-hidden border-2 border-gray-200 ">
          <div class="flex items-center justify-between w-full h-fit bg-gray-50 border border-transparent border-b-gray-200 px-6 py-6">
            <span class="font-semibold">{{ tl("public.visual.title")}}</span>
            <div class="flex items-center justify-center gap-2">
              <div class="relative w-[10px] h-[10px] rounded-full bg-green-500">
                <div class="absolute w-full h-full t-0 left-0 animate-ping-slow bg-green-500 rounded-full"></div>
              </div>
              <span class="font-semibold text-[var(--accent-color)] text-xs">{{ tl("public.visual.public")}}</span>
            </div>
          </div>

          <div class="px-6 py-6">
            <div class="flex items-center justify-start gap-2 px-4 py-4 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center justify-center text-gray-600">
                <i class="fa-solid fa-lock"></i>
              </div>
              <span class="flex items-center justify-center gap-2 font-semibold">
                <span class="text-[var(--accent-color)]">https://</span>
                <input class="w-[100px] outline-none" type="text" placeholder="kenan-ustalic" />
                <span class="text-[var(--text-color-light)]">.createyourself.ch</span>
              </span>
            </div>
          </div>

          <div class="px-6 py-6 pt-0 flex items-center justify-between gap-6">
            <div class="w-full">
              <div class="flex flex-col items-start justify-center gap-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50">
                <span class="uppercase text-[var(--text-color-light)] text-xs">{{ tl("public.visual.box-one.title")}}</span>
                <span class="font-semibold">{{ tl("public.visual.box-one.value")}}</span>
              </div>
            </div>

            <div class="w-full">
              <div class="flex flex-col items-start justify-center gap-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50">
                <span class="uppercase text-[var(--text-color-light)] text-xs">{{ tl("public.visual.box-two.title")}}</span>
                <span class="font-semibold">{{ tl("public.visual.box-two.value")}}</span>
              </div>
            </div>
          </div>

          <div class="w-full h-[1px] bg-gray-200"></div>

          <div class="px-6 py-6 flex flex-col gap-3">
            <div class="flex items-center justify-between w-full">
              <span>{{ tl("public.visual.bp-one")}}</span>
              <div class="cursor-pointer flex items-center justify-center text-[30px]">
                <i class="fa-solid fa-toggle-on"></i>
              </div>
            </div>

            <div class="flex items-center justify-between w-full">
              <span>{{ tl("public.visual.bp-two")}}</span>
              <div class="cursor-pointer flex items-center justify-center text-[30px]">
                <i class="fa-solid fa-toggle-on"></i>
              </div>
            </div>

            <div class="flex items-center justify-between w-full">
              <span>{{ tl("public.visual.bp-three")}}</span>
              <div class="cursor-pointer flex items-center justify-center text-[30px]">
                <i class="fa-solid fa-toggle-off"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-[600px] flex flex-col gap-2">
          <span class="text-[35px] leading-11 font-extrabold text-wrap">{{ tl("public.title")}}</span>

          <div class="flex items-start justify-start gap-4 mt-4">
            <div class="flex items-center justify-center min-w-[45px] min-h-[45px] rounded-lg bg-[var(--primary-color-light)] text-[var(--primary-color)]">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="flex flex-col items-start justify-center gap-1">
              <span class="font-semibold text-sm">{{ tl("public.fact-one.title")}}</span>
              <span class="text-sm text-[var(--text-color-light)]">{{ tl("public.fact-one.description")}}</span>
            </div>
          </div>

          <div class="flex items-start justify-start gap-4 mt-4">
            <div class="flex items-center justify-center min-w-[45px] min-h-[45px] rounded-lg bg-[var(--secondary-color-light)] text-[var(--secondary-color)]">
              <i class="fa-solid fa-briefcase"></i>
            </div>
            <div class="flex flex-col items-start justify-center gap-1">
              <span class="font-semibold text-sm">{{ tl("public.fact-two.title")}}</span>
              <span class="text-sm text-[var(--text-color-light)]">{{ tl("public.fact-two.description")}}</span>
            </div>
          </div>

          <div class="flex items-start justify-start gap-4 mt-4">
            <div class="flex items-center justify-center min-w-[45px] min-h-[45px] rounded-lg bg-green-100 text-[var(--accent-color)]">
              <i class="fa-regular fa-clock"></i>
            </div>
            <div class="flex flex-col items-start justify-center gap-1">
              <span class="font-semibold text-sm">{{ tl("public.fact-three.title")}}</span>
              <span class="text-sm text-[var(--text-color-light)]">{{ tl("public.fact-three.description")}}</span>
            </div>
          </div>

          <div class="flex items-start justify-start gap-4 mt-4">
            <div class="flex items-center justify-center min-w-[45px] min-h-[45px] rounded-lg bg-orange-100 text-orange-400">
              <i class="fa-solid fa-crosshairs"></i>
            </div>
            <div class="flex flex-col items-start justify-center gap-1">
              <span class="font-semibold text-sm">{{ tl("public.fact-four.title")}}</span>
              <span class="text-sm text-[var(--text-color-light)]">{{ tl("public.fact-four.description")}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="overflow-hidden relative bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">
      <div class="absolute top-0 left-0 w-full h-full grid-bg"></div>
      <div class="absolute -top-10 -left-10 w-[200px] h-[200px] rounded-full bg-gray-100 border border-gray-200 opacity-10"></div>
      <div class="absolute -right-20 bottom-20 w-[400px] h-[400px] rounded-full bg-gray-100 border border-gray-200 opacity-10"></div>
      <div class="absolute top-15 right-100 w-[300px] h-[300px] rounded-full bg-gray-100 border border-gray-200 opacity-10"></div>

      <div class="max-w-[1200px]">
        <div class="flex flex-col items-center justify-center text-wrap gap-3">
          <span class="text-[var(--text-color-white)] font-extrabold text-[35px]">{{ tl("cta.title") }}</span>
          <span class="text-gray-200 max-w-[650px] text-center">{{ tl("cta.subtitle") }}</span>
        </div>
      </div>
      <div class="z-10 flex items-center justify-center gap-4 mt-6">
        <RouterLink to="/register" class="hover:-translate-y-0.5 hover:shadow-lg duration-150 transition cursor-pointer shadow-lg flex items-center justify-center gap-2 text-[var(--primary-color)] font-semibold px-6 py-4 rounded-lg bg-[var(--surface-color)]">
          <i class="fa-solid fa-plus"></i>
          <span>{{ tl("cta.cta-one") }}</span>
        </RouterLink>

        <RouterLink to="/login" class="hover:-translate-y-0.5 hover:shadow-lg duration-150 transition cursor-pointer shadow-lg glass-bg px-6 py-4 font-semibold rounded-lg text-[var(--text-color-white)]">{{ tl("cta.cta-two") }}</RouterLink>
      </div>
    </section>
  </main>

  <Footer></Footer>
</template>

<style scoped>
  .glass-bg{
    background: rgba(255, 255, 255, 0.19);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.56);
  }

  .glass-bg:hover{
    backdrop-filter: blur(500px);
    -webkit-backdrop-filter: blur(500px);
    background: rgba(255, 255, 255, 0.23);
    border: 1px solid rgba(255, 255, 255, 0.65);
  }

  .header-bg{
    background: linear-gradientl(to bottom right, rgba(37, 99, 235, 0.12), transparent, rgba(124, 58, 237, 0.12))
  }

  .levitate{
    animation: levitate 5s ease-in-out infinite;
  }

  @keyframes levitate {
    0%{
      transform: translateY(0);
    }
    50%{
      transform: translateY(-25%);
    }
    100%{
      transform: translateY(0);
    }
  }

  .hero-text{
    animation: changetext 15s ease-in-out infinite;
  }

  @keyframes changetext {
    0%, 15% {
      transform: translateY(0%);
    }
    25%, 40% {
      transform: translateY(-100%);
    }
    50%, 65% {
      transform: translateY(-200%);
    }
    75%, 90% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  .animate-ping-slow {
    animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
</style>
