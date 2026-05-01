<script lang="ts" setup>
  import {useI18n} from "vue-i18n";

  const { t } = useI18n()

  const tl = (key: string) => t(`footer.${key}`)
</script>

<template>
  <div class="flex items-center justify-between px-6 py-6 bg-[var(--text-color)] text-sm text-[var(--text-color-light)]">
    <div>
      <span class="sm:text-md text-[11px] text-nowrap">{{ tl("Project-name") }}</span>
    </div>
    <div>
      <span class="sm:text-md text-[11px] text-nowrap">{{ tl("created-by") }}</span>
    </div>
  </div>
</template>
