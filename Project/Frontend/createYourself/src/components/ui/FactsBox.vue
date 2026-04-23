<script lang="ts" setup>
  const props = defineProps<{
    svg: string;
    svgColor: string,
    svgBgColor: string,
    title: string,
    description: string,
    factOne: string,
    factTwo: string,
    factThree: string,
  }>()
</script>

<template>
  <div class="bg-[var(--background-color)] p-6 border border-gray-200 rounded-lg">
    <div :style="{ backgroundColor: props.svgBgColor, color: props.svgColor}" class="flex items-center justify-center w-[45px] h-[45px] rounded-lg text-lg">
      <i :class="props.svg"></i>
    </div>
    <div class="flex flex-col gap-2 mt-3">
      <span class="font-bold">{{ props.title }}</span>
      <span class="text-sm text-[var(--text-color-light)] text-wrap">{{ props.description }}</span>
    </div>

    <div class="w-full h-[1px] bg-gray-200 my-6"></div>

    <div class="flex flex-col gap-2 items-start">
      <div class="text-xs flex items-center justify-center gap-2">
        <div class="flex items-center justify-center text-green-500">
          <i class="fa-solid fa-check"></i>
        </div>
        <span class="text-[var(--text-color-light)]">{{ props.factOne}}</span>
      </div>

      <div class="text-xs flex items-center justify-center gap-2">
        <div class="flex items-center justify-center text-green-500">
          <i class="fa-solid fa-check"></i>
        </div>
        <span class="text-[var(--text-color-light)]">{{ props.factTwo }}</span>
      </div>

      <div class="text-xs flex items-center justify-center gap-2">
        <div class="flex items-center justify-center text-green-500">
          <i class="fa-solid fa-check"></i>
        </div>
        <span class="text-[var(--text-color-light)]">{{ props.factThree }}</span>
      </div>
    </div>
  </div>
</template>
