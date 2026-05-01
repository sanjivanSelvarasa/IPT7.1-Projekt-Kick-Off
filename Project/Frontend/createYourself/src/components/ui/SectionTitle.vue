<script lang="ts" setup>
  const props = defineProps<{
    svg?: string,
    tagText: string,
    title: string,
    description: string,
  }>()
</script>

<template>
  <div class="mb-8 flex items-center justify-center flex-col">
    <div class="flex w-fit items-center justify-center gap-2 text-xs font-semibold bg-[var(--primary-color-light)] text-[var(--primary-color)] border border-blue-200 rounded-full px-3 py-1">
      <i :class="props.svg"></i>
      <span class="uppercase">{{ props.tagText }}</span>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 mt-4">
      <h1 class="text-center">{{ props.title }}</h1>
      <p class="text-[var(--text-color-light)] text-sm text-wrap max-w-[450px] text-center">{{ props.description }}</p>
    </div>
  </div>
</template>
