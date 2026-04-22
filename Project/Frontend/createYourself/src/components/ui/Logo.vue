<script lang="ts" setup>
  const props = defineProps<{
    link: string,
  }>()
</script>

<template>
  <RouterLink :to="props.link" class="font-semibold text-lg">
    Create<span class="bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-transparent bg-clip-text">Yourself</span>
  </RouterLink>
</template>
